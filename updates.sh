#!/bin/bash

sudo npm i -g npm-check-updates
dirs=(quiz ../program_visualizer ../rapid_reading)

for directory in ${dirs[@]}
do
  cd ${directory}
  ncu -u
  npm i
  npm audit fix
done

git commit -am 'Update npm packages'
