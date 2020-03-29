Тесты для калькулятора
====
Требования приложение калькулятор для платформы андроид 9, устройств с разрешением экрана HD, выполняет действия над:
подмножеством рациональных чисел в диапазоне от-10e+37 до-10e+37, 2 знака после запятой, действия сложения, вычитания, умножения и деления с выводом результатов в текстовое поле  

Тесты написаны для функций сложения, умножения, бесконечность примитивная валидация кнопок. Используется язык js.  

Тесты:  
Functional (Black Box):  
* positive  
  * Проверка что кнопки отображаются и подписаны (не проверяется, что нажимаются кнопки на софт клавиатуре)  
  * Проверка арифметических действий (+, *, -, /) реализованы +, * (числа целые, целые отрицательные, дробные 2 цифры после запятой, дробные отрицательные 2 цифры после запятой)  
  * Проверка округления  
  * Проверка максимального числа  
  * Проверка бесконечности (поля ввода)  
  * Проверка бесконечности (результат)  
* negative  
  * неправильные формат ввода данных (строка, спец. символы, дробные значения с количеством знаков после запятой более 2)  
----
Instruction  
1. [Appium](http://appium.io/downloads.html)
1. [setup node and npm](https://nodejs.org/en/download/)  
1. Terminal/Shell   
  1. git clone https://github.com/AntonVTR/CatlulatorTest.git   
  1. npm install  
  1. npm test  
----
Описание кейсов смотри в папке cases 
