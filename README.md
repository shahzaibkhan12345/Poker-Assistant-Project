# ♠️ GTO Poker Assistant (Trainer Edition)

A local, desktop assistant designed to provide Game Theory Optimal (GTO) pre-flop suggestions for 6-max No-Limit Hold'em cash games.

**Target Audience:** macOS (Client) and Windows (Developer/Testing).

## ✨ Core Features

*   **GTO Decision Logic:** Provides instant, pre-programmed optimal play suggestions (Raise, Call, Fold).
*   **Cross-Platform:** Built using Electron for native desktop deployment on macOS (`.dmg`) and Windows (`.exe`).
*   **Offline Operation:** The application runs entirely locally—no internet connection required after launch.
*   **Training-Focused Interface:** Simple UI for manual input of position, hand, and scenario.
*   **Basic Hand Memory:** Stores the last 20 hands/decisions in a session for internal tracking.

## 🛑 Important Disclaimers

**THIS IS A TRAINER, NOT A BOT.**

*   **NO Automation:** This app does not interact with, scrape, or automate any poker client (including GGPoker).
*   **Manual Input Only:** Decisions are based purely on data manually entered by the user.

***

# 1. Developer Guide (Windows Development Workflow)

This section is for the project maintainer (you) and covers setting up, testing on Windows, and generating the final Mac application.

### 🛠️ Step 1: Local Setup

1.  **Prerequisites:** Ensure you have [Node.js (LTS version)](https://nodejs.org/en) and Git installed on your Windows machine.
2.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd poker-gto-assistant
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```

### 💻 Step 2: Testing and Debugging on Windows

Use the `npm start` command for rapid development and testing on your Windows machine.

1.  **Run the App (Development Mode):**
    ```bash
    npm start
    ```
    *   **Purpose:** This launches the application directly from source. Use `Ctrl + Shift + I` to open Developer Tools for debugging the logic.

### 🚀 Step 3: Generating the macOS Deliverable (Via GitHub Actions)

To create the final `.dmg` for the Mac client, push your committed changes to the repository. The build is handled automatically by GitHub's macOS servers.

1.  **Commit and Push Final Code:**
    ```bash
    git add .
    git commit -m "Final GTO logic and code changes ready for client build"
    git push
    ```
2.  **Download Artifacts from GitHub:**
    *   Navigate to your repository's **Actions** tab.
    *   Click on the latest workflow run and scroll to the **Artifacts** section to download the **`macOS-GTO-Assistant-DMG`** zip file.

***

# 2. Client Guide (Installation and Usage)

This section contains all the instructions your Mac client needs to install and run the application successfully.

### 🛠️ Quick Installation Guide (macOS)

Please follow these 3 simple steps to install the application:

1.  **Unzip the File:** Unzip the downloaded file (e.g., from the ZIP provided by the developer). You will find the installer file: **`GTO Poker Assistant-1.0.0.dmg`**.
2.  **Install the App:**
    *   **Double-click the `.dmg` file.** A small window will pop up showing the app icon and a shortcut to your Applications folder.
    *   **Drag the `GTO Poker Assistant.app` icon** and drop it onto the **Applications** folder shortcut. This copies the app to your system.
3.  **Launch the App:**
    *   Close the installer window and **eject the Disk Image**.
    *   Open your **Applications** folder and **double-click** the **`GTO Poker Assistant.app`** to launch the trainer.

### 🔒 Important Note on Mac Security (Read This!)

Since the application is downloaded from the internet and not the official Mac App Store, macOS's security settings may block it the first time you launch it.

If you see a warning like **"app cannot be opened because the developer cannot be verified"**:

1.  Go to your Mac's **System Settings** (or System Preferences).
2.  Go to **Privacy & Security**.
3.  Scroll down, and you should see a message mentioning **`GTO Poker Assistant`** was blocked.
4.  Click the **"Open Anyway"** button next to it.
5.  You will be prompted one last time, click **Open**.

### 📝 How to Use Your Trainer

The app is ready for manual input of **Position**, **Hand**, and **Scenario**. The output panel will give instant GTO guidance:

| Output Action | Meaning & Guidance | UI Color |
| :--- | :--- | :--- |
| **RAISE [Amount]** | The optimal aggressive move (e.g., 3-Bet to 9BB). | **Green** |
| **CALL (Flatted)** | The optimal defensive/passive move. | **Yellow** |
| **FOLD** | The hand is outside the optimal range. | **Red** |
| **FOLD... [Reason]** | The requested spot is uncoded/unknown. | **Red** |

Let me know if you have any questions or run into any issues during installation.