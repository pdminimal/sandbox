#!/usr/bin/env python3

import glob
import os
import re
import shutil
import subprocess

for i in glob.glob('dist/*'):
   os.remove(i)

subprocess.run('parcel build index.html --no-source-maps', shell=True)

dest = '../docs/program_visualizer/'
for i in glob.glob(f'{dest}*'):
   os.remove(i)

file_name = glob.glob('dist/main.*.js')[0]
shutil.copy(file_name, f'{dest}main.js')

file_name = glob.glob('dist/main.*.css')[0]
shutil.copy(file_name, f'{dest}main.css')

with open(f'{dest}index.html', 'w') as dest_file:
    with open('dist/index.html', 'r') as src_file:
        text = src_file.read()
        text = re.sub(r'href="/main\.(.+?)\.css', r'href="main.css?bust=\1', text)
        text = re.sub(r'src="/main\.(.+?)\.js', r'src="main.js?bust=\1', text)
        dest_file.write(text)
