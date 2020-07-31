from inspect import currentframe
import os
import re


class SelfPrint:
    def __init__(self, marker="-", leading=""):
        f_back = currentframe().f_back
        with open(os.path.realpath(f_back.f_code.co_filename), "r") as file:
            self.lines = file.readlines()
        self.leading = leading
        self.comment_indices = [
            index
            for index, line in enumerate(self.lines)
            if re.match(r"\s*# " + marker, line)
        ]

    def print(self):
        f_back = currentframe().f_back
        line_index = f_back.f_lineno - 1
        start = max(c for c in self.comment_indices + [0] if c < line_index)
        for i in range(start, line_index):
            print(self.leading + self.lines[i], end="")
