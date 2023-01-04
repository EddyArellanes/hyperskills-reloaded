echo "Building frontend..."
cd frontend
npm run build
cd ../backend
echo "Building backend..."
npm run build
rm -rf dist/public/*
cd ..
echo "Configuring backend for frontend..."
cp  -a frontend/dist/. backend/dist/public
echo "App Done!"