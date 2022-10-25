import pyautogui
from PIL import Image, ImageGrab
import time

def hit(key):
    pyautogui.keyDown(key)


def isCollide(data):
    for i in range(186, 520):
        for j in range(474, 550):
            if data[i, j] < 100:
                return True
    return False

def isCollideInNight(data):
    for i in range(186, 520):
        for j in range(474, 550):
            if data[i, j] > 165:
                return True
    return False


def isNightMode(data):
    for i in range(200, 300):
        for j in range(660, 700):
            if data[i, j] < 100:
                return isCollideInNight(data)
    return isCollide(data)



if __name__ == "__main__":
    time.sleep(3)
    while True:
        image = ImageGrab.grab().convert('L')
        data = image.load()
        if isNightMode(data):
            hit("up")
    # draw a shape and show image for debug 
    # for i in range(186, 425):
    #     for j in range(480, 558):
    #         data[i, j] = 165
    # image.show()
