import cv2
import numpy as np
import mediapipe as mp
import time

# Setup MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Webcam
cap = cv2.VideoCapture(0)

# Calculator Layout
keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
]

# Positioning
key_size = 60
spacing_x = 10
spacing_y = 10
start_x = 50
start_y = 150  # Leave space at top for display

# Calculator variables
equation = ""
result = ""

def draw_keyboard(img, keys):
    positions = []
    y = start_y
    for row in keys:
        x = start_x
        row_positions = []
        for key in row:
            w = key_size
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (50, 50, 50), -1)
            cv2.rectangle(img, (x, y), (x + w, y + key_size), (255, 255, 255), 1)
            font_scale = 0.8
            cv2.putText(img, key, (x + 15, y + 40), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (255, 255, 255), 2)
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
    img = cv2.resize(img, (800, 600))
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)

    # Draw current equation and result
    cv2.rectangle(img, (start_x, 30), (start_x + 300, 100), (30, 30, 30), -1)
    cv2.putText(img, equation, (start_x + 10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2)
    cv2.putText(img, result, (start_x + 10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

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
                                if key == 'C':
                                    equation = ""
                                    result = ""
                                elif key == '=':
                                    try:
                                        result = str(eval(equation))
                                    except:
                                        result = "Error"
                                else:
                                    equation += key
                                hover_start_time = time.time() + 999  # Wait until finger moves

            if key_found is None:
                hover_key = None
                hover_start_time = None

    else:
        hover_key = None
        hover_start_time = None

    cv2.imshow("Virtual Calculator - Hover Press", img)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC to quit
        break

cap.release()
cv2.destroyAllWindows()

