# 🚀🔥💰Ecomm🥇😎🚀

## 🥇🤖E-commerce site💰🔥

![landing page](./public/ecomm.jpg)

## About Us

Ecomm is an ecommerce portal where user can add items to cart and checkout.

## Assumptions

1. Only Backend APIs are exposed
2. Only 3 items are available as of now where Item(id,name,price,quantitySold) are:
   <br/>
   Item("1", "Shoes", 2000, 0)
   <br/>
   Item("2", "Tshirt", 700, 0)
   <br/>
   Item("3", "Watch", 1000, 0)
   <br/>

3. In-memory store is used instead of database.

4. Admin can generate the discount code any time when he/she wants.

5. Discount code and promo code are synonymous in repository

6. The code can be used only once.

7. The code is activated only if it is valid and it is nth order.

8. n is assumed as 5 so discount code will be eligible every 5th order.

9. Only 1 user is adding to cart and checking out.

## API Design

### Doc attached in repository

## In memory DB design

### Doc attached in repository

## Postman API Collection

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/19975338-049fedb4-7b95-4c7a-bb06-889954c8b69a?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D19975338-049fedb4-7b95-4c7a-bb06-889954c8b69a%26entityType%3Dcollection%26workspaceId%3D544ab6c6-966b-476e-9474-b96cfe6a1847)
