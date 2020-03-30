**Bug Name:** Отрицательный ноль  
**Build Number:** 1.225.1.1-1819727  
**Environment:** Android virtual device Android 9.0 (Google APIs)  
**Description:** При попытке выплнить операцию возвращающее 0 может вернуть отрицательное значение   

**Steps To Reproduce:**  
1. Запустить приложение AndroidSampleApp  
2. В поле ввода 1 ввести 0   
3. В поле ввода 2 ввести -3.84  
4. Нажать на "*"  
5. Резульат 0.00 * -3.84 = -0.00  

**Expected Result:**  
0.00 * -3.84 = 0.00  
