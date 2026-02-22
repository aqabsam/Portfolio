import cv2
import numpy as np
import mediapipe as mp
import pyautogui
import time

# Setup MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Webcam
cap = cv2.VideoCapture(0)

# Keyboard Layout
keys = [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','Q','W','E','R','T','Y','U','I','O','P','[',']','\\'],
    ['Caps','A','S','D','F','G','H','J','K','L',';','\'','Enter'],
    ['Shift','Z','X','C','V','B','N','M',',','.','/','Shift'],
    ['Space']
]

# Positioning
key_size = 60
spacing_x = 10
spacing_y = 10
start_x = 50
start_y = 50

def draw_keyboard(img, keys):
    positions = []
    y = start_y
    for row in keys:
        x = start_x
        row_positions = []
        for key in row:
            w = key_size * 2 if key in ['Backspace','Enter','Shift','Caps','Tab'] else (key_size * 6 if key == 'Space' else key_size)
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (50, 50, 50), -1)
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (255, 255, 255), 1)
            font_scale = 0.6 if len(key) <= 2 else 0.5
            cv2.putText(img, key, (x + 10, y + 40), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), 1)
            row_positions.append((key, (x, y, w, key_size)))
            x += w + spacing_x
        positions.append(row_positions)
        y += key_size + spacing_y
    return positions

# Hover logic
hover_start_time = None
hover_key = None
hover_delay = 1  # seconds

while True:
    ret, img = cap.read()
    if not ret:
        break
    img = cv2.flip(img, 1)
    img = cv2.resize(img, (1400, 800))
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    key_positions = draw_keyboard(img, keys)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            index_finger_tip = hand_landmarks.landmark[8]
            h, w, _ = img.shape
            x, y = int(index_finger_tip.x * w), int(index_finger_tip.y * h)
            cv2.circle(img, (x, y), 10, (0, 255, 255), -1)

            key_found = None
            for row in key_positions:
                for key, (kx, ky, kw, kh) in row:
                    if kx < x < kx + kw and ky < y < ky + kh:
                        key_found = key
                        cv2.rectangle(img, (kx, ky), (kx + kw, ky + kh), (0, 255, 0), 2)

                        if hover_key != key:
                            hover_key = key
                            hover_start_time = time.time()
                        else:
                            if time.time() - hover_start_time >= hover_delay:
                                # Simulate key press
                                press_key = key.lower()
                                if key == 'Space':
                                    press_key = 'space'
                                elif key == 'Backspace':
                                    press_key = 'backspace'
                                elif key == 'Enter':
                                    press_key = 'enter'
                                elif key == 'Tab':
                                    press_key = 'tab'
                                elif key == 'Caps':
                                    press_key = 'capslock'
                                elif key == 'Shift':
                                    press_key = 'shift'
                                pyautogui.press(press_key)
                                hover_start_time = time.time() + 999  # Prevent re-press until finger moves

            if key_found is None:
                hover_key = None
                hover_start_time = None

    else:
        hover_key = None
        hover_start_time = None

    cv2.imshow("Virtual Keyboard - Hover Press", img)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()

