import inspect
import os
import re


class SelfPrint:
    def __init__(self, marker="-", leading="") -> str:
        f_back = inspect.currentframe().f_back
        with open(f_back.f_code.co_filename, "r") as file:
            self.lines = file.readlines()
        self.marker = marker
        self.leading = leading
        return None

    def print(self, text=None, marker=None, leading=None):
        if not marker:
            marker = self.marker
        if not leading:
            leading = self.leading
        comment_indices = [
            index
            for index, line in enumerate(self.lines)
            if re.match(r"\s*# " + marker, line)
        ]

        f_back = inspect.currentframe().f_back
        line_index = f_back.f_lineno - 1
        start = max(c for c in comment_indices + [0] if c < line_index)
        for i in range(start, line_index):
            print(leading + self.lines[i], end="")
        if text:
            print(text)
