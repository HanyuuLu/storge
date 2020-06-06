import random
import string


def get_strong_pass(length):
    strongpassword = ""
    for i in range(length):
        strongpassword += random.choice(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_')
    return strongpassword

length = int(input("Length of password?: "))
print(type(length))
print(length)
a = get_strong_pass(length)
print(a)
input()
