# Privacy Policy for TileLaunch

**Effective Date:** October 1, 2026  
**Last Updated:** October 1, 2026  

TileLaunch ("we", "our", or "us") is dedicated to protecting your privacy. This Privacy Policy describes how TileLaunch operates and explains why each Android permission is requested.

**Summary:**  
TileLaunch is built on a privacy-first foundation. We do **not** collect, track, profile, sell, or transmit any of your personal data or device usage information. All features—including live tile flipping, notification counts, calendar schedules, and weather updates—operate entirely on your device.

---

## 1. Permissions Requested and Purpose of Use

### 1.1 Installed Applications (`LauncherApps` / Query Packages)
- **Purpose:** TileLaunch is a replacement home screen (launcher). In order to display your installed applications in the All Apps drawer and Start screen tile grid, and to launch them when you tap a tile or list item, the launcher queries installed packages on your device.
- **Data Handling:** Package names, activity names, app labels, and app icons are processed solely on your device. This data is never logged, stored remotely, or transmitted to any external server.

### 1.2 Notification Access (`NotificationListenerService`)
- **Purpose:** Used strictly to compute real-time unread notification count badges displayed on your tiles (such as phone, messaging, email, or messaging apps).
- **Data Handling:** TileLaunch strictly inspects package names to calculate numeric count totals. TileLaunch **never** reads, stores, logs, analyzes, or transmits the textual content, sender details, message body, or media attachments of your notifications. We intentionally do not request sensitive `READ_CALL_LOG` or `READ_SMS` permissions.

### 1.3 Coarse Approximate Location (`ACCESS_COARSE_LOCATION`)
- **Purpose:** Requested optionally when you add or configure the Weather Live Tile. It allows TileLaunch to look up current weather conditions and temperature forecasts for your approximate area using the open-source, keyless Open-Meteo API.
- **Data Handling:** Approximate latitude and longitude are sent directly from your device to the Open-Meteo weather endpoint to retrieve weather metrics. Your location is never logged, stored in any database outside your device, or shared with third parties. If this permission is denied or skipped, TileLaunch defaults to a standard city coordinate without tracking you.

### 1.4 Calendar Events (`READ_CALENDAR`)
- **Purpose:** Requested optionally when you pin or view the Calendar Live Tile. It reads the title, start/end time, and location of your next upcoming scheduled event to display it on the 3D flipping calendar tile.
- **Data Handling:** Calendar events are queried locally using Android's standard `CalendarContract`. No event information ever leaves your device.

### 1.5 Photos & Media (`READ_MEDIA_IMAGES` / `READ_EXTERNAL_STORAGE`)
- **Purpose:** Requested when you choose a custom photo wallpaper for your Start screen or Cover screen, or when cycling pictures on the Photos Live Tile slideshow.
- **Data Handling:** Photo files are accessed locally through Android MediaStore or the system photo picker. No photos are ever uploaded, copied off your device, or analyzed.

### 1.6 Google Play Billing (`com.android.vending.BILLING`)
- **Purpose:** Used to process the optional one-time "TileLaunch Pro" lifetime in-app purchase.
- **Data Handling:** Transactions and payment details are processed directly and securely by Google Play. TileLaunch does not receive, store, or process your credit card numbers, billing addresses, or payment credentials.

### 1.7 Internet Access (`android.permission.INTERNET`)
- **Purpose:** Used exclusively to:
  1. Fetch current weather forecast metrics from the Open-Meteo API.
  2. Verify in-app purchase tokens via the official Google Play Billing library.
  3. Request interstitial advertisements via the Google Mobile Ads SDK during initial onboarding.
- **Data Handling:** No user personal identifiers, calendar details, or notification payloads are transmitted.

### 1.8 Advertising & Consent (`Google Mobile Ads SDK / UMP`)
- **Purpose:** In the Free version of TileLaunch, a single interstitial advertisement may be shown upon completing the initial onboarding setup. Pro users enjoy a completely ad-free experience.
- **Data Handling:** Ad requests and European Economic Area (EEA) / UK user consent are managed by the Google User Messaging Platform (UMP) and Google Mobile Ads (AdMob) SDK. Google may process device identifiers (such as Android Advertising ID / AAID) and diagnostic data for ad serving, fraud prevention, and analytics in accordance with [Google's Privacy Policy](https://policies.google.com/privacy). TileLaunch strictly isolates all local data—calendar events, notification counts, installed apps, and photos are never sent to AdMob.

---

## 2. Third-Party Analytics and Advertising

- **Advertising:** TileLaunch uses the Google Mobile Ads (AdMob) SDK solely for a single onboarding placement in the Free tier. No ads ever appear on your home screen, Start grid, app drawer, or Cover screen. Pro unlocks 100% ad-free usage.
- **Analytics & Tracking:** Zero analytics SDKs (No Firebase Analytics, Mixpanel, Segment, Flurry, etc.). We do not track your app launches, your search queries, or your browsing habits.
- **Crash Telemetry:** Zero external telemetry trackers. Local logs stay strictly on your device.

We do not track your behavior, we do not log which apps you launch, and we do not maintain user profiles.

---

## 3. Data Retention and Security

All settings, layouts, theme selections, and cached weather forecasts are stored locally on your device in private SQLite / Room databases and encrypted DataStore files accessible only by TileLaunch. When you uninstall TileLaunch, all local configuration files are deleted by the Android operating system.

---

## 4. Contact Information

If you have questions, feedback, or concerns regarding this Privacy Policy, please contact us at:  
**Support Email:** support@tilelaunch.app  
**Project Repository:** https://github.com/tilelaunch/launcher  
