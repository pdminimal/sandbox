import unittest
from io import StringIO
from unittest.mock import patch

from self_print import SelfPrint


class TestSelfPrint(unittest.TestCase):
    def test_no_comment(self):
        sp = SelfPrint()
        with patch("sys.stdout", new=StringIO()) as stdout:
            sp.print()
            expected = """\
import unittest
from io import StringIO
from unittest.mock import patch

from self_print import SelfPrint


class TestSelfPrint(unittest.TestCase):
    def test_no_comment(self):
        sp = SelfPrint()
        with patch("sys.stdout", new=StringIO()) as stdout:
"""
            self.assertEqual(expected, stdout.getvalue())

    def test_print(self):
        sp = SelfPrint()
        # - test_print
        with patch("sys.stdout", new=StringIO()) as stdout:
            sp.print("test")
            expected = """\
        # - test_print
        with patch("sys.stdout", new=StringIO()) as stdout:
test
"""
            self.assertEqual(expected, stdout.getvalue())

    def test_marker(self):
        sp = SelfPrint(marker="@")
        # @ custom marker
        # - default marker
        with patch("sys.stdout", new=StringIO()) as stdout:
            sp.print()
            expected = """\
        # @ custom marker
        # - default marker
        with patch("sys.stdout", new=StringIO()) as stdout:
"""
            self.assertEqual(expected, stdout.getvalue())

    def test_leading(self):
        sp = SelfPrint(leading="- ")
        # -
        with patch("sys.stdout", new=StringIO()) as stdout:
            sp.print()
            expected = """\
-         # -
-         with patch("sys.stdout", new=StringIO()) as stdout:
"""
            self.assertEqual(expected, stdout.getvalue())
