import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Post')
    private readonly PostModel: Model<Post>
  ) {}

  async getPosts(): Promise<Post[]> {
    const posts = await this.PostModel
      .find()
      .exec();
    return posts;
  }

  async getPost(postId): Promise<Post> {
    const post = await this.PostModel
      .findById(postId)
      .exec();
    return post;
  }

  async addPost(CreatePostDTO: CreatePostDTO): Promise<Post> {
    const newPost = await this.PostModel(CreatePostDTO);
    return newPost.save();
  }

  async editPost(postId, CreatePostDTO: CreatePostDTO): Promise<Post> {
    const editedPost = await this.PostModel
      .findByIdAndUpdate(postId, CreatePostDTO, { new: true });
    return editedPost;
  }

  async deletePost(postId): Promise<any> {
    const deletedPost = await this.PostModel
      .findByIdAndRemove(postId);
    return deletedPost;
  }
}
