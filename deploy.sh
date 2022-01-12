cd _dist

git init
git remote add origin git@github.com:davay42/gun-vue.git 
git add . --force
git commit -m 'deploy'

git push -f origin HEAD:gh-pages

cd -