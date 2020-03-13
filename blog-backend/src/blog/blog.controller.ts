import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('posts/:postId')
  async getPost(
    @Res() res,
    @Param('postId', new ValidateObjectId()) postId) {
      const post = await this.blogService.getPost(postId);

      if (!post) return new NotFoundException('Post does not exist!');

      return res.status(HttpStatus.OK).json(post);
  }

  @Post('/post')
  async addPost(@Res() res, @Body() CreatePostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(CreatePostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been created successfully',
      post: newPost,
    });
  }

  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('postId', new ValidateObjectId()) postId,
    @Body() CreatePostDTO: CreatePostDTO) {
      const editedPost = await this.blogService.editPost(postId, CreatePostDTO);
      if (!editedPost) return new NotFoundException('Post does not exist!');

      return res.status(HttpStatus.OK).json({
        post: editedPost,
        message: 'Post has been successfully updated',
      });
  }

  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('postId', new ValidateObjectId()) postid) {
      const deletedPost = await this.blogService.deletePost(postid);
      if (!deletedPost) return new NotFoundException('Post does not exist!')

      return res.status(HttpStatus.OK).json({
        post: deletedPost,
      });
  }
}