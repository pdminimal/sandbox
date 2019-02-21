import jaconv
import random
import re
from collections import Counter

with open('corpus.txt') as f:
    text = f.read()

orig = jaconv.h2z(re.sub(r'(［.+?］|《.+?》)', '', text, flags=(re.MULTILINE | re.DOTALL)),
                  digit=True, ascii=True)


def make_next_segs(orig, one_grams, thres=1000):
    one_gram_counts = Counter(one_grams).most_common(thres)

    two_grams = [''.join(one_grams[i: i + 2])
                 for i in range(0, len(one_grams), 2)]
    two_grams2 = [''.join(one_grams[i: i + 2])
                  for i in range(1, len(one_grams), 2)]
    two_gram_counts = Counter(two_grams + two_grams2).most_common(thres)
    # common_two_grams = [i[0] for i in two_gram_counts]
    # c_thres = max(c_thres, two_gram_counts[-1][1])
    segs = two_gram_counts + one_gram_counts
    segs.sort(key=lambda a: -a[1])
    segs = [i for i in segs[:int(thres * 1.5)] if i[1] > round(
        len(one_grams) / thres / 5)]
    segs.sort(key=lambda a: -len(a[0]))
    pattern = f"({'|'.join([i[0] for i in segs[:thres]])}|.)"
    return [i for i in re.findall(pattern, orig) if i]


print("{:,}".format(len(orig)))
segs = orig[: 10 * 1000 * 1000]
prev = segs
for i in range(300):
    newsegs = []
    for seg in segs:
        if random.randint(0, 5) > 0:
            newsegs.append(seg)
        else:
            newsegs.extend(seg)
    l = len(set(segs)) * 2 // 2 - 1
    print(l)
    segs = make_next_segs(orig, segs, l)
    if len(set(prev)) >= len(set(segs)):
        print(i, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        break
    print(i, len(prev), len(segs))
    prev = segs
c = Counter(segs).most_common(len(segs))

start = 30000
print(orig[start: start + 300])
print([jaconv.z2h(i, digit=True, ascii=True) for i in segs[start:start + 300]])
c.sort(key=lambda a: (-len(a[0]), -a[1]))
pattern = f"({'|'.join([i[0] for i in c[:l]])}|)"
segs = [i for i in re.findall(pattern, orig) if i]
print([jaconv.z2h(i, digit=True, ascii=True) for i in segs[start:start + 300]])
# print(c)
print(i)
