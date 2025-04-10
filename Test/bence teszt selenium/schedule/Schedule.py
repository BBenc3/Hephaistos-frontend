from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Brave beállítás
brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
options = webdriver.ChromeOptions()
options.binary_location = brave_path

driver = webdriver.Chrome(options=options)
driver.set_window_size(2040, 1680)

try:
    # Oldal betöltése
    driver.get("http://localhost:3000/schedule")
    print("Schedule oldal betöltve, várok 5 másodpercet...")
    time.sleep(5)
    driver.save_screenshot("schedule_alapbetoltes.png")
    print("Képernyőkép az alapállapotról kész.")

    # Gomb kiválasztása osztály alapján (a kép alapján)
    gomb = driver.find_element(By.CSS_SELECTOR, "button.MuiButton-containedPrimary")
    gomb.click()
    print("Gomb megnyomva.")
    time.sleep(3)

    # Gomb utáni állapot mentése
    driver.save_screenshot("schedule_gomb_megnyomva.png")
    print("Képernyőkép a gomb megnyomása után kész.")

except Exception as e:
    print(f"Hiba történt: {e}")
    driver.save_screenshot("schedule_hiba.png")

finally:
    driver.quit()
    print("Böngésző bezárva.")
