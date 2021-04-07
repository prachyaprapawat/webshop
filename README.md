# webshop
# การบ้าน Developer SHIPPOP (Online)

1.1) 
![image](https://user-images.githubusercontent.com/31690912/113841019-828eb080-97bb-11eb-8b78-4ea7852e7fbb.png)

1.2) 
![image](https://user-images.githubusercontent.com/31690912/113842265-b3bbb080-97bc-11eb-9da8-d09fbe96c6d5.png)
![image](https://user-images.githubusercontent.com/31690912/113842436-dcdc4100-97bc-11eb-9cad-b915935e66f9.png)

หรือ

![image](https://user-images.githubusercontent.com/31690912/113842842-4bb99a00-97bd-11eb-8e4f-e5f9a9257999.png)
![image](https://user-images.githubusercontent.com/31690912/113842876-55db9880-97bd-11eb-8f2b-90613c352058.png)


1.3)
![image](https://user-images.githubusercontent.com/31690912/113843553-def2cf80-97bd-11eb-86d3-7cd692887e59.png)
- First Class Function คือ การเอา function ไปปเก็บในตัวเเปรหรือก็คือเอาตัวเเปรไปเป็นฟังก์ชั่นตัวหนึ่งเลย

2)เลือก Mongodb
- Preplanning
เลือกใช้ Database ให้เหมาะกับงานที่ต้องทำเเละวางโครงสร้างให้เหมาะสม
- Understanding the purpose of data
การเข้าใจจุดประสงค์ของข้อมูลนั้นทำให้เรารู้เเนวทางเเละความสำคัญของข้อมูลเเต่ละอันเช่นผมเคยไม่ได้เก็บวันที่นั้นทำให้ผมไม่สามารถเรียงข้อมูลตามวันเวลาได้เลย
- Normalization
ในการใช้ Mongodb ผมปกติหากผมจะลดความซ้ำซ้อมของข้อมูลผมจะใช้การอ้างอิงข้อมูลโดยใช้ _id ของก้อนข้อมูลนั้น ๆ
- Prevent redundant records
ปกติหาผมไม่ต้องการให้ข้อมูลใน database ส่วนนั้น ๆซ้ำผมจะ set unique ไว้ใน schema
- Indexing
การเลือกใช้ index ในการชี้ข้อมูลปกติดผมมักจะใช้ _id ของก้อนข้อมูลนั้น ๆ หรือมักจะใช้ 
unique key ที่สร้างขึ้นมา
- Domain values and table management
ปกติผมจะอนุญาตให้ผู้ใช้จัดการข้อมูลในส่วนที่อนุญาตเท่านั้นซึ่งมักจะไม่ให้เเก้จุดที่เป็นunique key 
- Consistent naming conventions
ผมมักจะตั้งชื่อโดยอิงจากข้อมูลที่เอาเข้ามาเเละดูจากข้อมูลก้อนนั้น ๆ
- Documentation
ปกติผมจะใช้  Document ของ Postman ทำ 
- Usage testing
ผมจะลองใช่ postman ทดสอบดึงข้อมูลเเละทดลองการเชื่อมต่อ
