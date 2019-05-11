from collections import Counter
import jaconv
import math
import random
import re
import unicodedata

with open('corpus.txt') as f:
    text = f.read()

orig = jaconv.h2z(text, digit=True, ascii=True)


def step(orig, one_grams):
    volume = len(set(one_grams))

    one_gram_counts = Counter(one_grams).most_common(volume)
    two_grams = [''.join(one_grams[i: i + 2])
                 for i in range(0, len(one_grams), 2)]
    two_grams2 = [''.join(one_grams[i: i + 2])
                  for i in range(1, len(one_grams), 2)]
    two_gram_counts = Counter(two_grams + two_grams2).most_common(volume // 5)
    vocab = two_gram_counts + one_gram_counts
    vocab.sort(key=lambda a: (-len(a[0]), -a[1]))
    pattern = f"({'|'.join(i[0] for i in vocab)}|.)"
    vocab = Counter(re.findall(pattern, orig)).most_common(volume)
    vocab.sort(key=lambda a: -len(a[0]))
    pattern = f"({'|'.join(i[0] for i in vocab)}|.)"
    return re.findall(pattern, orig)


print("{:,}".format(len(orig)))
segs = orig[: 10 * 1000 * 1000]
TARGET_VOCAB = 10000
for i in range(100):
    segs = step(orig, segs)
    num_vocab = len(set(segs))
    print(num_vocab)
    if num_vocab > TARGET_VOCAB:
        break

start = 30000
print([unicodedata.normalize("NFKC", i) for i in segs[start:start + 300]])
