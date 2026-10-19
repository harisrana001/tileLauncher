# TileLaunch: Pre-Flight Production Release Checklist

Use this checklist before creating release builds and publishing to the Google Play Store.

---

## 1. Application & Versioning Configuration
- [ ] **Application ID**: Verify `applicationId = "com.tilelaunch.launcher"` in `app/build.gradle.kts`.
- [ ] **Version Code & Name**: Increment `versionCode` (e.g. `10`) and `versionName` (e.g. `"1.0.0"`).
- [ ] **SDK Targets**: Ensure `minSdk = 26` (Android 8.0) and `targetSdk = 35` (Android 15).
- [ ] **Release Signing**: Configure `signingConfigs.create("release")` using environment variables for `KEYSTORE_PATH`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, and `KEY_PASSWORD`.

---

## 2. AOT Baseline Profiles & Low-End Device Performance (2 GB RAM)
- [ ] **Baseline Profile**: Verify `app/src/main/baseline-prof.txt` is packaged.
- [ ] **ProfileInstaller**: Ensure `androidx.profileinstaller:profileinstaller:1.4.1` is in dependencies.
- [ ] **Memory Footprint**: Ensure bitmap decoding uses `inSampleSize` to keep heap usage well below 64 MB.
- [ ] **Recomposition Hotspots**: Ensure grid scroll, live preview drag reflow, and turnstile launch transitions maintain a smooth 60fps on 2 GB RAM test devices.
- [ ] **Layer Offloading**: Verify 3D tilt, turnstile rotation, and tile-rise cascade animations run on GPU graphics layers (`graphicsLayer { ... }`).

---

## 3. Idle Battery Conservation & Background Services
- [ ] **Screen-Off Timer Cancellation**: Live tile flip containers and cover screen clock timers must suspend immediately when the device screen turns off or the launcher is not in foreground (`repeatOnLifecycle(Lifecycle.State.RESUMED)`).
- [ ] **Visibility Guard**: Live tile animations do not run when user is on the All Apps page (`isVisible == false`).
- [ ] **WorkManager Constraints**: Weather background sync uses `NetworkType.CONNECTED` and runs at 2-hour periodic intervals without aggressive wake-locks.
- [ ] **Notification Listener**: `TileNotificationService` runs locally without continuous CPU polling.

---

## 4. Google Play Billing (Pro Tier)
- [ ] **In-App Product Setup**: Create in-app product ID `tilelaunch_pro_lifetime` in Google Play Console.
- [ ] **Pricing**: Configure local prices and tax categories.
- [ ] **Purchase Flow**: Verify purchase, purchase token acknowledgment (`acknowledgePurchase`), and query on cold start.
- [ ] **Feature Gating**:
  - [ ] Classic 2-column era locked on Free; unlocked on Pro.
  - [ ] 6 accent colors available on Free (Cyan, Teal, Lime, Pink, Orange, Steel); all 20 on Pro.
  - [ ] Standard tiles on Free; Weather, Calendar & Photos Live Tiles on Pro.
  - [ ] Cover Screen locked on Free; unlocked on Pro.
  - [ ] Layout export & import locked on Free; unlocked on Pro.
- [ ] **Offline Persistence**: Verify Pro status persists in DataStore across app reboots when offline.

---

## 5. Home Launcher Role & System Integration
- [ ] **Manifest Intent Filters**:
  - `MAIN`, `HOME`, `DEFAULT` categories registered on `MainActivity`.
  - `launchMode="singleTask"`.
  - Transparent window background so system wallpaper is preserved.
- [ ] **Default Launcher Prompt**:
  - API 29+: `RoleManager.createRequestRoleIntent(RoleManager.ROLE_HOME)`.
  - API 26–28: `Settings.ACTION_HOME_SETTINGS` fallback.
- [ ] **Package Visibility**: Use `<queries>` block with the launcher intent rather than broad `QUERY_ALL_PACKAGES` permission.

---

## 6. Play Store Branding & Policy Compliance
- [ ] **Strict Brand Rule**: Ensure 0 occurrences of "Nokia", "Lumia", "Windows Phone", or "Microsoft" in:
  - App Title
  - Short Description
  - Full Description
  - Screenshots & Promotional graphics
  - In-app text and dialogs
- [ ] **Approved Terminology**: Phrased strictly as *"Metro-style tile launcher"*.
- [ ] **Assets Needed**:
  - App Icon (512x512 PNG, 32-bit color)
  - Feature Graphic (1024x500 PNG)
  - Phone Screenshots (minimum 4, 16:9 or 9:16 aspect ratio)
  - 7-inch & 10-inch Tablet Screenshots (if targeting tablets)

---

## 7. Privacy Policy & Data Safety Form
- [ ] **Hosted Privacy Policy**: Publicly host `docs/PRIVACY_POLICY.md` at a public URL (e.g. GitHub Pages).
- [ ] **Play Console Data Safety Questionnaire**:
  - Data collected: **No**
  - Data shared with third parties: **No**
  - Data encrypted in transit: **Yes (weather API calls use HTTPS)**
  - Request for deletion: **Not applicable (all data is stored locally and deleted on app uninstall)**
- [ ] **In-App Privacy Policy**: Confirm "Privacy Policy" button in Settings opens `PrivacyPolicyDialog`.

---

## 8. ProGuard / R8 Build & Release Generation
- [ ] Run release bundle build:
  ```bash
  ./gradlew bundleRelease
  ```
- [ ] Test the release APK on a physical device:
  ```bash
  ./gradlew assembleRelease
  ```
- [ ] Verify R8 has not obfuscated Room DAOs, Billing Client classes, or JSON serialization models.
