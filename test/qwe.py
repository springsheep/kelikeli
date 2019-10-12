
from selenium import webdriver
import time
# webdriver可以认为是浏览器的驱动器，要驱动浏览器必须用到webdriver，支持多种浏览器，这里以Chrome为例
chrome_driver = '/Users/zhangpeng/Downloads/chromedriver'
browser = webdriver.Chrome(executable_path=chrome_driver)
browser.set_window_size(800, 800)
browser.get('https://inv-veri.chinatax.gov.cn/')
print(browser.find_element_by_class_name("font_red").text)

browser.find_element_by_id("fpdm").send_keys("3600192130")
browser.find_element_by_id("fphm").send_keys("02236855")
browser.find_element_by_id("kprq").send_keys("20190919")
browser.find_element_by_id("kjje").send_keys("279.61")

print(browser.find_element_by_xpath("//img[@id='yzm_img']").get_attribute('src'))
# 隐形等待
# browser.find_element_by_class_name('btn-search').click()
# print(browser.page_source)#browser.page_source是获取网页的全部html
fo = open("foo.txt", "w")
img = open("imgs.txt", "w")
img.write(browser.find_element_by_xpath("//img[@id='yzm_img']").get_attribute('src'))
fo.write(browser.page_source)
img.close()
# 关闭打开的文件
fo.close()

# browser.close()

