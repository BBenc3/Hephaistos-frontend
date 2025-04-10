from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Brave beállítás
brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
options = webdriver.ChromeOptions()
options.binary_location = brave_path

driver = webdriver.Chrome(options=options)
driver.set_window_size(2040, 1680)

try:
    # Oldal betöltése
    driver.get("http://localhost:3000/login")
    print("Login oldal betöltve, várok...")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "usernameOrEmail"))
    )
    driver.save_screenshot("login_oldal.png")

    # --- Első (hibás) belépés ---
    username_input = driver.find_element(By.NAME, "usernameOrEmail")
    password_input = driver.find_element(By.NAME, "password")

    username_input.send_keys("tesztfelhasznalo")
    print("Hibás felhasználónév beírva")
    password_input.send_keys("TitkosJelszo123")
    print("Hibás jelszó beírva")

    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()
    print("Bejelentkezés gomb megnyomva (rossz adatokkal)")

    time.sleep(3)
    driver.save_screenshot("login_rosszeredmeny.png")
    print("Képernyőkép a hibás bejelentkezés után kész")

    # --- Mezők újrakeresése és valódi törlés ---
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.NAME, "usernameOrEmail"))
    )
    password_input = driver.find_element(By.NAME, "password")

    username_input.click()
    username_input.send_keys(Keys.CONTROL + "a")
    username_input.send_keys(Keys.DELETE)

    password_input.click()
    password_input.send_keys(Keys.CONTROL + "a")
    password_input.send_keys(Keys.DELETE)

    print("Mezők újra lekérdezve és valóban törölve")

    # --- Második (helyes) belépés ---
    username_input.send_keys("string2")
    print("Helyes felhasználónév beírva")
    password_input.send_keys("string")
    print("Helyes jelszó beírva")

    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()
    print("Bejelentkezés gomb megnyomva (jó adatokkal)")

    time.sleep(3)
    driver.save_screenshot("login_joeredmeny.png")
    print("Képernyőkép a helyes bejelentkezés után kész")

except Exception as e:
    print(f"Hiba történt: {e}")
    driver.save_screenshot("login_hiba.png")

finally:
    driver.quit()
    print("Böngésző bezárva.")
