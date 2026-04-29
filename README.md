# SurfBud AI Backend

A lightweight Node.js backend that powers SurfBud AI.

## Endpoints

### GET /forecast?lat=50.2&lon=-5.48
Returns:
- OpenMeteo forecast
- Met Office placeholder
- Surf cheat sheet summary

## Deploy on Render
1. Push this repo to GitHub
2. Create new Web Service on Render
3. Select this repo
4. Build command: (leave empty)
5. Start command: `node server.js`
