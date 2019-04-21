#!/usr/bin/env python3

import glob
import os
import re
import shutil
import subprocess


def remove(path):
    for i in glob.glob(path):
        os.remove(i)


remove('dist/*')

subprocess.run('parcel build index.html --no-source-maps', shell=True)

dest = '../docs/program_visualizer/'

remove(f'{dest}*')

shutil.copy(glob.glob('dist/main.*.js')[0], f'{dest}main.js')
shutil.copy(glob.glob('dist/main.*.css')[0], f'{dest}main.css')

with open(f'{dest}index.html', 'w') as dest_file:
    with open('dist/index.html', 'r') as src_file:
        text = src_file.read()
        text = re.sub(r'href="/main\.(.+?)\.css', r'href="main.css?bust=\1',
                      text)
        text = re.sub(r'src="/main\.(.+?)\.js', r'src="main.js?bust=\1', text)
        dest_file.write(text)
