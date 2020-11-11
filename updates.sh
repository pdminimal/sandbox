#!/bin/bash

sudo npm i -g npm-check-updates

cd quiz
ncu -u
npm i

cd ../program_visualizer
ncu -u
npm i

cd ../rapid_reading
ncu -u
npm i

git commit -am 'Update npm packages'
