import unittest

# from io import StringIO
# from unittest.mock import patch
from fs import memoryfs, enums

from start_project import StartProject


class TestStartProject(unittest.TestCase):
    def test_osfs(self):
        self.assertTrue("self_print.py" in StartProject("test").fs.listdir("."))

    def test_generate_directory(self):
        sp = StartProject("test", memoryfs.MemoryFS())
        sp.generate()
        info = sp.fs.getinfo(sp.name, namespaces=["details"])
        self.assertEqual(enums.ResourceType.directory, info.type)

    def test_generate_directory_warning(self):
        sp = StartProject("test", memoryfs.MemoryFS())
        sp.generate()
        info = sp.fs.getinfo(sp.name, namespaces=["details"])
        self.assertEqual(enums.ResourceType.directory, info.type)
        sp.generate()
        info = sp.fs.getinfo(sp.name, namespaces=["details"])
        self.assertEqual(enums.ResourceType.directory, info.type)

    def test_generate_directory_error(self):
        sp = StartProject("test", memoryfs.MemoryFS())
        sp.fs.writetext("test", "teststring")
        try:
            sp.generate()
            self.fail()
        except IOError:
            pass
