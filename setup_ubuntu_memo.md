```bash
sudo apt install -y neovim mosh build-essential xdg-utils
curl -sLf https://spacevim.org/install.sh | bash
git clone https://github.com/Shougo/vimproc.vim
cd vimproc.vim/
make

ssh-keygen -t rsa -b 4096
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

cd
git clone https://github.com/rupa/z.git
echo '. ~/z/z.sh' >> ~/.bashrc
echo 'PROMPT_COMMAND="history -a;$PROMPT_COMMAND"' >> ~/.bashrc

git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
echo export FZF_DEFAULT_COMMAND=\'rg --files --hidden --glob \"\!.git\"\' >> ~/.bashrc
echo export FZF_DEFAULT_OPTS=\'--height 40% --layout=reverse --border\' >> ~/.bashrc

vi ~/.bash_aliases
```

~/.bashrc
```
HISTSIZE=10000
HISTFILESIZE=20000
```

~/.bash_aliases
```
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
```

~/.SpaceVim.d/init.toml
```
[options]
    bootstrap_before = "myspacevim#before"
    bootstrap_after = "myspacevim#after"
    enable_vimfiler_filetypeicon = true
    enable_vimfiler_gitstatus = true

[[layers]]
name = 'git'

[[layers]]
name = 'fzf'

[[layers]]
name = 'lang#python'

[[custom_plugins]]
repo = 'mg979/vim-visual-multi'
```

~/.SpaceVim.d/autoload/myspacevim.vim
```
function! myspacevim#before() abort
endfunction

function! myspacevim#after() abort
  set autoread
  set list
  nnoremap ; :
  nnoremap : ;
endfunction
```

# fonts *(optional)
```bash
cd
git clone --depth 1 https://github.com/ryanoasis/nerd-fonts
cd nerd-fonts
./install.sh
```

```bash
sudo apt install -y nodejs npm
sudo npm install -g n
sudo n lts
sudo npm install -g npm-check-updates
ncu -g
sudo npm install -g neovim
sudo apt install -y python3-venv python3-pip python2-dev
pip3 install --user neovim
curl https://bootstrap.pypa.io/get-pip.py --output get-pip.py
python2 get-pip.py 
rm get-pip.py 
pip2 install neovim
echo export PYTHON_HOST_PROG=\`which python2\` >> ~/.bashrc
echo export PYTHON3_HOST_PROG=\`which python3\` >> ~/.bashrc
. ~/.bashrc

# docker
# check https://docs.docker.com/engine/install/ubuntu/
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
