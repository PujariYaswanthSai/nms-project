# Quick Start Guide - Running the Application

This guide provides step-by-step instructions to quickly get the 5G Core NMS Monitoring Dashboard up and running on your local machine.

## Prerequisites

- **Node.js** (version 16 or higher recommended)
- **npm** (comes with Node.js)
- **Google Gemini API Key** (optional, for AI explanation feature)
  - Get it free from: https://aistudio.google.com/app/apikey

## Installation & Running

### Step 1: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd nms-project
npm install
```

This will install all dependencies listed in `package.json`, including React, TypeScript, Vite, and the Google Gemini API client.

### Step 2: Configure Environment Variables (Optional)

If you want to use the AI explanation feature, create a `.env` file in the `nms-project` directory:

**Windows (PowerShell/CMD):**
```bash
echo GEMINI_API_KEY=your_api_key_here > .env
```

**Linux/Mac:**
```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env
```

Or manually create a `.env` file with the following content:
```
GEMINI_API_KEY=your_actual_api_key_here
```

**Note:** Replace `your_actual_api_key_here` with your actual Google Gemini API key. The application will run without this key, but the "AI ?" explanation feature will not work.

### Step 3: Start the Development Server

Run the application using one of the following commands:

```bash
npm start
```

Or alternatively:

```bash
npm run dev
```

Both commands do the same thing - they start the Vite development server.

### Step 4: Access the Application

Once the server starts, open your web browser and navigate to:

**http://localhost:3000**

The server is configured to run on port 3000 and will be accessible on all network interfaces (`0.0.0.0`).

## How to Verify Your Project is Running

After installing dependencies and configuring the sample configs, follow these steps to verify your project is running correctly:

### 1. Check Terminal Output

When you run `npm start` or `npm run dev`, you should see output similar to:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
  ➜  press h + enter to show help
```

**✅ Success indicators:**
- No error messages in the terminal
- Server shows "ready" status
- Port 3000 is displayed as active
- No "port already in use" errors

### 2. Access the Application in Browser

Open your web browser and navigate to **http://localhost:3000**

**✅ Success indicators:**
- Page loads without "connection refused" or "site can't be reached" errors
- The 5G Core NMS Monitoring Dashboard interface appears
- You can see the sidebar navigation menu
- Dashboard components are visible (cards, charts, metrics)

### 3. Verify UI Components

Check that the following UI elements are working:

- **Sidebar Navigation**: Click through different sections (Dashboard, Reports, Architecture, Setup Guide)
- **Dashboard View**: Should display metrics cards (CPU, RAM, Sessions, Throughput, etc.)
- **Real-time Updates**: Metrics should be updating automatically (simulated data)
- **No Console Errors**: Open browser DevTools (F12) and check the Console tab - there should be no red error messages

### 4. Test Key Features

- **Navigation**: Click on different menu items in the sidebar
- **Dashboard**: Verify metrics are displayed and updating
- **Reports**: Navigate to Reports section
- **Architecture**: Check the Architecture view loads
- **Setup Guide**: Verify the Setup Guide shows the sample configurations you installed

### 5. Check Browser Developer Tools

Open browser DevTools (Press `F12` or `Ctrl+Shift+I`):

**Console Tab:**
- ✅ No red error messages
- ✅ Only informational messages (if any)

**Network Tab:**
- ✅ HTTP requests to `localhost:3000` return status 200
- ✅ Assets (JS, CSS) are loading successfully

### 6. Verify Environment Variables (Optional)

If you configured the Gemini API key:

1. Navigate to any section with an "AI ?" button
2. Click the "AI ?" button
3. It should either:
   - ✅ Show an AI explanation (if API key is valid)
   - ⚠️ Show an error message (if API key is missing/invalid - this is expected and doesn't mean the app isn't running)

### Common Verification Commands

**Check if port 3000 is in use (Windows PowerShell):**
```powershell
netstat -ano | findstr :3000
```

**Check if port 3000 is in use (Linux/Mac):**
```bash
lsof -i :3000
# or
netstat -tuln | grep 3000
```

**Test if server is responding:**
```bash
curl http://localhost:3000
```

### Troubleshooting: Project Not Running

If the project doesn't seem to be running:

1. **Check terminal for errors** - Look for red error messages
2. **Verify dependencies installed** - Run `npm install` again if needed
3. **Check port availability** - Ensure port 3000 is not used by another application
4. **Clear cache and restart** - Delete `node_modules` and `package-lock.json`, then reinstall
5. **Check Node.js version** - Ensure you have Node.js 16+ installed: `node --version`

## Available Commands

- `npm start` or `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it by modifying `vite.config.ts`:

```typescript
server: {
  port: 3001, // Change to any available port
  host: '0.0.0.0',
},
```

### Dependencies Not Installing

If you encounter issues during `npm install`:

1. Delete the `node_modules` folder and `package-lock.json`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `npm install`

### API Key Not Working

- Ensure the `.env` file is in the `nms-project` directory (same level as `package.json`)
- Make sure the variable name is exactly `GEMINI_API_KEY` (not `API_KEY`)
- Restart the development server after creating/modifying the `.env` file
- Verify your API key is valid at https://aistudio.google.com/app/apikey

## Development Mode

The application runs in development mode with:
- Hot Module Replacement (HMR) - changes reflect instantly
- Source maps for debugging
- Fast refresh for React components

## Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory. To preview the production build:

```bash
npm run preview
```

## Support

For more detailed information about the project features and architecture, see the main [README.md](./README.md) file.

