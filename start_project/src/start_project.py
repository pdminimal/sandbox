from fs import enums, errors, osfs
from self_print import SelfPrint


class StartProject:
    def __init__(self, name, fs=None):
        self.sp = SelfPrint(leading="- ")
        self.name = name
        if fs is None:
            fs = osfs.OSFS(".")
        self.fs = fs

    def warning(self, text):
        print("Warining: " + text)

    def error(self, text):
        print("Error: " + text)
        raise IOError(text)

    def generate(self):
        # - investigating dir
        try:
            info = self.fs.getinfo(self.name, namespaces=["details"])
            if info.type == enums.ResourceType.directory:
                self.sp.print()
                self.warning(f"Target directory '{self.name}' already exists.")
            else:
                self.error(
                    f"Target path '{self.name}' already exists and is not a directory."
                )
        except errors.ResourceNotFound:
            # - generate dir
            self.fs.makedir(self.name)
            self.sp.print()
