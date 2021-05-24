# Pictoramica-API
Pictoramica-API is the backend API for the Pictoramica-Client application. Using Express.js and Mongoose.js along with MongoDB as the database, data in the Pictoramica-Client application is able to be created, retrieved, updated, and deleted.

## Created By: Darius Williams, Shafqat Ahmad, Christine Huang, and Ashley Norwood.

## Links
- Application: https://sitbackn-react.github.io/pictoramica/#/
- Frontend Repo (Version 1): https://github.com/SitBackN-React/Pictoramica-Client
- Backend Repo (Version 1): https://github.com/SitBackN-React/Pictoramica-API
- Frontend Repo (Version 2): https://github.com/SitBackN-React/pictoramica (Currently in development)
- Backend Repo (Version 2): https://github.com/SitBackN-React/pictoramica-server (Currently in development)


## API Endpoints
### Images
| Verb   | URI Pattern     | Controller#Action  |
|:-------|:----------------|:-------------------|
| GET    | `/my-images`    | `my-images#index`  |
| GET    | `/all-images`   | `my-images#index`  |
| GET    | `/images/:id`   | `images#show`      |
| POST   | `/images`       | `images#create`    |
| PATCH  | `/images/:id`   | `images#update`    |
| DELETE | `/images/:id`   | `images#destroy`   |


### ImageLikes
| Verb   | URI Pattern                                  | Controller#Action      |
|:-------|:---------------------------------------------|:-----------------------|
| GET    | `/images/:imageId/imageLikes/:imageLikeId`   | `imageLikes#show`      |
| POST   | `/images/:imageId/imageLikes`                | `imageLikes#create`    |
| DELETE | `/images/:imageId/imageLikes/:imageLikeId`   | `imageLikes#destroy`   |


### Blogs
| Verb   | URI Pattern    | Controller#Action |
|:-------|:---------------|:------------------|
| GET    | `/my-blogs`    | `my-blogs#index`  |
| GET    | `/all-blogs`   | `my-blogs#index`  |
| GET    | `/blogs/:id`   | `blogs#show`      |
| POST   | `/blogs`       | `blogs#create`    |
| PATCH  | `/blogs/:id`   | `blogs#update`    |
| DELETE | `/blogs/:id`   | `blogs#destroy`   |


### Posts
| Verb   | URI Pattern                      | Controller#Action |
|:-------|:---------------------------------|:------------------|
| GET    | `/blogs/:blogId/posts/:postId`   | `posts#show`      |
| POST   | `/blogs/:blogId/posts`           | `posts#create`    |
| PATCH  | `/blogs/:blogId/posts/:postId`   | `posts#update`    |
| DELETE | `/blogs/:blogId/posts/:postId`   | `posts#destroy`   |


### PostLikes
| Verb   | URI Pattern                                            | Controller#Action     |
|:-------|:-------------------------------------------------------|:----------------------|
| GET    | `/blogs/:blogId/posts/:postId/postLikes/:postLikeId`   | `postLikes#show`      |
| POST   | `/blogs/:blogId/posts/postLikes`                       | `postLikes#create`    |
| DELETE | `/blogs/:blogId/posts/:postId/postLikes/:postLikeId`   | `postLikes#destroy`   |


### Comments
| Verb   | URI Pattern                                          | Controller#Action    |
|:-------|:-----------------------------------------------------|:---------------------|
| GET    | `/blogs/:blogId/posts/:postId/comments/:commentId`   | `comments#show`      |
| POST   | `/blogs/:blogId/posts/:postId/comments`              | `comments#create`    |
| PATCH  | `/blogs/:blogId/posts/:postId/comments/:commentId`   | `comments#update`    |
| DELETE | `/blogs/:blogId/posts/:postId/comments/:commentId`   | `comments#destroy`   |


### AWS
| Verb   | URI Pattern     | Controller#Action  |
|:-------|:----------------|:-------------------|
| POST   | `/post-image`   | `awss#create`      |


## WireFrame
![Screen Shot 2020-09-14 at 4 42 45 PM](https://user-images.githubusercontent.com/58965588/93526823-fe9bd680-f905-11ea-9d1a-cc365d94dc27.png)
