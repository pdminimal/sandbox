from inspect import currentframe
import os
import re


class SelfPrint:
    def __init__(self, marker="-", leading=""):
        f_back = currentframe().f_back
        with open(os.path.realpath(f_back.f_code.co_filename), "r") as file:
            self.lines = file.readlines()
        self.leading = leading
        self.comments = [
            no + 1
            for no, line in enumerate(self.lines)
            if re.match(r"\s*# " + marker, line)
        ]

    def print(self):
        f_back = currentframe().f_back
        lineno = f_back.f_lineno
        start = max(c for c in self.comments + [1] if c < lineno)
        for i in range(start, lineno):
            print(self.leading + self.lines[i - 1], end="")
