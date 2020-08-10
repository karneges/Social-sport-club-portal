export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
echo -e "Hello"
nvm use 13
npm run build:prod
cd dist cp -r ../node-backend/public/
git commit -am"Re Deploy"
git push
