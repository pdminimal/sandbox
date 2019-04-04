from collections import Counter
import jaconv
import math
import random
import re
import unicodedata

with open('corpus.txt') as f:
    text = f.read()

text = re.sub(r'(［.+?］|《.+?》)', '', text, flags=(re.MULTILINE | re.DOTALL))
text = re.sub('\u3000+', '\u3000', text, flags=(re.MULTILINE | re.DOTALL))
orig = jaconv.h2z(text, digit=True, ascii=True)


def make_next_segs(orig, one_grams, thres=1000):
    one_gram_counts = Counter(one_grams).most_common(thres)

    two_grams = [''.join(one_grams[i: i + 2])
                 for i in range(0, len(one_grams), 2) if '\n' not in one_grams[i: i + 2]]
    two_grams2 = [''.join(one_grams[i: i + 2])
                  for i in range(1, len(one_grams), 2) if '\n' not in one_grams[i: i + 2]]
    two_gram_counts = Counter(two_grams + two_grams2).most_common(thres)
    segs = two_gram_counts + one_gram_counts
    segs.sort(key=lambda a: (-a[1], len(a[0])))
    segs = segs[:thres]
    segs.sort(key=lambda a: -len(a[0]))
    pattern = f"({'|'.join([i[0] for i in segs])}|.)"
    return [i for i in re.findall(pattern, orig) if i]


print("{:,}".format(len(orig)))
segs = orig[: 10 * 1000 * 1000]
prev = segs
prev_score = None
for i in range(20):
    newsegs = []
    for seg in segs:
        if random.randint(0, 5) > 0:
            newsegs.append(seg)
        else:
            newsegs.extend(seg)
    l = len(set(segs))
    print(l)
    segs = make_next_segs(orig, segs, l)
    score = len(set(segs))
    if prev_score and prev_score >= score:
        print(i, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        print(i, prev_score, score)
        break
    print(i, "{:,}".format(prev_score or 0),
          "{:,}".format(score), len(prev), len(segs))
    prev = segs
    prev_score = score
c = Counter(segs).most_common(len(segs))

start = 30000
print(orig[start: start + 300])
print([unicodedata.normalize("NFKC", i) for i in segs[start:start + 300]])
c.sort(key=lambda a: -len(a[0]))
pattern = f"({'|'.join([i[0] for i in c[:l]])}|)"
segs = [i for i in re.findall(pattern, orig) if i]
print([unicodedata.normalize("NFKC", i) for i in segs[start:start + 300]])
print([(unicodedata.normalize("NFKC", i[0]), i[1])
       for i in c if len(i[0]) > 8][:1300])
print(i)


# abab
# a 2 b 2, abab 1 < ab 2
# 1*2+1*2 +1*2, 6*1 < 3 * 3
