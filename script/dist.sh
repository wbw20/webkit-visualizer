# /bin/bash

if [ -d "build/" ]; then
  rm -rf build/
fi

mkdir build/
mkdir build/temp/

echo 'copying node dependancies...'
cp -r node_modules build/temp/node_modules
echo 'copying views...'
cp src/index.html build/temp/index.html
echo 'copying js...'
cp -r src/js/**/*.js build/temp/
echo 'copying package.json...'
cp package.json build/temp/package.json

echo 'packaging application...'
cd build/temp/
zip ../app.nw -r .
cd ../..

echo 'cleaning up...'
rm -rf build/temp/

echo '...DONE'
