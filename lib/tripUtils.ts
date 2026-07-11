// lib/tripUtils.ts

interface PlaceSlot {
    place: {
        name: string;
        city: string;
        category: string;
        rating: number;
        timing: { open: string; close: string };
        ticket: { isFree: boolean; indian: number; foreigner: number };
        visitDuration: { recommended: string };
        description: string;
        highlights: string[];
        location: { address: string; googleMapUrl: string };
    };
    timeSlot: string;
    startTime: string;
    endTime: string;
}

interface DayPlan {
    day: number;
    date: string;
    city: string;
    morning: PlaceSlot | null;
    afternoon: PlaceSlot | null;
    evening: PlaceSlot | null;
}

// ============ SHARE FUNCTION ============
export async function shareItinerary(
    days: DayPlan[],
    cities: string[]
): Promise<{ success: boolean; method: string }> {
    const totalDays = days.length;
    const totalPlaces = days.reduce((acc, day) => {
        return acc + [day.morning, day.afternoon, day.evening].filter(Boolean).length;
    }, 0);

    const shareText = `🏰 My Rajasthan Trip Plan\n\n📅 ${totalDays} Days | 📍 ${cities.join(", ")}\n🎯 ${totalPlaces} Places to Visit\n\n${generateTextSummary(days)}\n\nCreated with Royal Rajasthan Tourism`;

    const shareData = {
        title: "My Rajasthan Trip Plan",
        text: shareText,
        url: window.location.href,
    };

    // Try Web Share API first (mobile devices)
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return { success: true, method: "share-api" };
        } catch (err: any) {
            if (err.name === "AbortError") {
                return { success: false, method: "cancelled" };
            }
        }
    }

    // Fallback: Copy to clipboard
    try {
        await navigator.clipboard.writeText(shareText);
        return { success: true, method: "clipboard" };
    } catch {
        // Final fallback: textarea copy
        const textarea = document.createElement("textarea");
        textarea.value = shareText;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return { success: true, method: "textarea-copy" };
    }
}

// ============ DOWNLOAD PDF FUNCTION ============
export function downloadPDF(days: DayPlan[], config: {
    cities: string[];
    startDate: string;
    pace: string;
}) {
    const totalPlaces = days.reduce((acc, day) => {
        return acc + [day.morning, day.afternoon, day.evening].filter(Boolean).length;
    }, 0);

    let totalCost = 0;
    let freeCount = 0;
    days.forEach((day) => {
        [day.morning, day.afternoon, day.evening].forEach((slot) => {
            if (slot) {
                if (slot.place.ticket.isFree) freeCount++;
                else totalCost += slot.place.ticket.indian;
            }
        });
    });

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rajasthan Trip Itinerary</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      color: #1a1a1a;
      background: white;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    h1, h2, h3 { font-family: 'Playfair Display', serif; }

    .header {
      text-align: center;
      border-bottom: 3px solid #D4AF37;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .header h1 {
      font-size: 32px;
      color: #7A1F1F;
      margin-bottom: 5px;
    }

    .header .subtitle {
      color: #D4AF37;
      font-size: 14px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin: 20px 0 30px;
      flex-wrap: wrap;
    }

    .stat {
      text-align: center;
      padding: 10px 20px;
      background: #FFF8EE;
      border-radius: 8px;
      border: 1px solid #E9D5A1;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #D4AF37;
      font-family: 'Playfair Display', serif;
    }

    .stat-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .day {
      margin-bottom: 25px;
      page-break-inside: avoid;
      border: 1px solid #eee;
      border-radius: 12px;
      overflow: hidden;
    }

    .day-header {
      background: linear-gradient(135deg, #7A1F1F, #9A2F2F);
      color: white;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .day-header h2 {
      font-size: 18px;
      margin: 0;
    }

    .day-header .date {
      font-size: 12px;
      opacity: 0.8;
    }

    .day-content {
      padding: 15px 20px;
    }

    .slot {
      display: flex;
      gap: 15px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .slot:last-child { border-bottom: none; }

    .slot-time {
      min-width: 100px;
      flex-shrink: 0;
    }

    .slot-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #D4AF37;
    }

    .slot-hours {
      font-size: 11px;
      color: #999;
    }

    .slot-content h3 {
      font-size: 16px;
      color: #1a1a1a;
      margin-bottom: 3px;
    }

    .slot-meta {
      font-size: 12px;
      color: #666;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 4px;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 600;
    }

    .badge-free {
      background: #dcfce7;
      color: #166534;
    }

    .badge-paid {
      background: #fef3c7;
      color: #92400e;
    }

    .leisure {
      color: #999;
      font-style: italic;
      font-size: 13px;
      padding: 8px 0;
    }

    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #D4AF37;
      color: #999;
      font-size: 12px;
    }

    .footer .brand {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      color: #7A1F1F;
      font-weight: 700;
    }

    @media print {
      body { padding: 20px; }
      .day { page-break-inside: avoid; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="subtitle">Royal Rajasthan Tourism</div>
    <h1>🏰 My Rajasthan Trip Itinerary</h1>
    <p style="color:#666; font-size:13px; margin-top:5px;">
      ${config.cities.join(" → ")} | Starting ${new Date(config.startDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
    </p>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="stat-value">${days.length}</div>
      <div class="stat-label">Days</div>
    </div>
    <div class="stat">
      <div class="stat-value">${config.cities.length}</div>
      <div class="stat-label">Cities</div>
    </div>
    <div class="stat">
      <div class="stat-value">${totalPlaces}</div>
      <div class="stat-label">Places</div>
    </div>
    <div class="stat">
      <div class="stat-value">${freeCount}</div>
      <div class="stat-label">Free Entry</div>
    </div>
    <div class="stat">
      <div class="stat-value">₹${totalCost}</div>
      <div class="stat-label">Est. Cost</div>
    </div>
  </div>

  ${days
            .map(
                (day) => `
    <div class="day">
      <div class="day-header">
        <h2>Day ${day.day} — ${day.city}</h2>
        <span class="date">${day.date}</span>
      </div>
      <div class="day-content">
        ${renderSlotPDF("Morning", "8:00 AM - 12:00 PM", day.morning)}
        ${renderSlotPDF("Afternoon", "1:00 PM - 5:00 PM", day.afternoon)}
        ${renderSlotPDF("Evening", "5:00 PM - 8:00 PM", day.evening)}
      </div>
    </div>
  `
            )
            .join("")}

  <div class="footer">
    <div class="brand">Royal Rajasthan Tourism</div>
    <p style="margin-top:5px;">Generated on ${new Date().toLocaleDateString("en-IN")} | www.royalrajasthan.com</p>
    <p style="margin-top:5px;">💡 Tip: Print this or save as PDF using Ctrl+P / Cmd+P</p>
  </div>

  <script>
    // Auto trigger print dialog
    window.onload = function() {
      setTimeout(function() { window.print(); }, 500);
    };
  </script>
</body>
</html>`;

    // Open in new window for printing/PDF
    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
    } else {
        // Fallback: Download as HTML file
        downloadAsHTML(html);
    }
}

function renderSlotPDF(
    label: string,
    time: string,
    slot: PlaceSlot | null
): string {
    if (!slot) {
        return `
      <div class="slot">
        <div class="slot-time">
          <div class="slot-label">${label}</div>
          <div class="slot-hours">${time}</div>
        </div>
        <div class="leisure">🧘 Leisure time - Explore local markets & food</div>
      </div>`;
    }

    const p = slot.place;
    return `
    <div class="slot">
      <div class="slot-time">
        <div class="slot-label">${label}</div>
        <div class="slot-hours">${time}</div>
      </div>
      <div class="slot-content">
        <h3>${p.name}</h3>
        <div class="slot-meta">
          <span>📍 ${p.city}</span>
          <span>🏛 ${p.category}</span>
          <span>⭐ ${p.rating}</span>
          <span>🕐 ${p.timing.open} - ${p.timing.close}</span>
          <span>⏱ ${p.visitDuration.recommended}</span>
          <span class="badge ${p.ticket.isFree ? "badge-free" : "badge-paid"}">
            ${p.ticket.isFree ? "✅ Free Entry" : `🎫 ₹${p.ticket.indian} (Indian) / ₹${p.ticket.foreigner} (Foreigner)`}
          </span>
        </div>
      </div>
    </div>`;
}

// ============ DOWNLOAD AS HTML FILE ============
function downloadAsHTML(html: string) {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rajasthan-Trip-Itinerary-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============ DOWNLOAD AS TEXT FILE ============
export function downloadAsText(days: DayPlan[]) {
    const text = `ROYAL RAJASTHAN TOURISM - TRIP ITINERARY
${"=".repeat(50)}
Generated: ${new Date().toLocaleString("en-IN")}

${generateTextSummary(days)}

${"=".repeat(50)}
Created with Royal Rajasthan Tourism
www.royalrajasthan.com`;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rajasthan-Trip-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============ GENERATE TEXT SUMMARY ============
function generateTextSummary(days: DayPlan[]): string {
    return days
        .map((day) => {
            const slots = [
                day.morning ? `  🌅 Morning: ${day.morning.place.name} (${day.morning.startTime} - ${day.morning.endTime})` : "",
                day.afternoon ? `  ☀️ Afternoon: ${day.afternoon.place.name} (${day.afternoon.startTime} - ${day.afternoon.endTime})` : "",
                day.evening ? `  🌇 Evening: ${day.evening.place.name} (${day.evening.startTime} - ${day.evening.endTime})` : "",
            ]
                .filter(Boolean)
                .join("\n");

            return `📅 Day ${day.day} — ${day.city} (${day.date})\n${slots}`;
        })
        .join("\n\n");
}

// ============ TOAST NOTIFICATION ============
export function showToast(message: string, type: "success" | "error" | "info" = "success") {
    // Remove existing toast
    const existing = document.getElementById("toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast-notification";

    const bgColor =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-blue-500";

    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

    toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl z-[9999] flex items-center gap-2 text-sm font-medium animate-bounce`;
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.className = "ml-2 text-white/70 hover:text-white text-lg";
    closeBtn.onclick = () => toast.remove();
    toast.appendChild(closeBtn);

    document.body.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transition = "opacity 0.3s, transform 0.3s";
        toast.style.opacity = "0";
        toast.style.transform = "translate(-50%, 20px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}