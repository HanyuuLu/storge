import hashlib as hl
import sys


def calc(stream, orig: str) -> str:
    return '''
origin\t%s
md5\t%s
sha1\t%s
sha256\t%s
''' %\
        (
            orig,
            hl.md5(stream).hexdigest(),
            hl.sha1(stream).hexdigest(),
            hl.sha256(stream).hexdigest()
        )


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print("please add args to argv")
        print("[help] input string to calculate the hash\n\tif you want to calculator hash code of files, add \"-F\" or \"-file\"")
        sys.exit()
    ptr = 1
    while ptr < len(sys.argv):
        orig = sys.argv[ptr]
        if orig == '-F' or orig == '-file':
            pass
            try:
                if ptr+1 == len(sys.argv):
                    print("[error] Oops,too little args")
                    sys.exit()
                with open(sys.argv[ptr + 1], 'rb') as r:
                    res = r.read()
                    print(calc(res, "[file]%s" % sys.argv[ptr+1]))
                ptr += 2
                continue
            except Exception as e:
                print(e)
                sys.exit()
        else:
            res = str.encode(sys.argv[ptr], 'utf8')
            print(calc(res, orig))
            ptr += 1
