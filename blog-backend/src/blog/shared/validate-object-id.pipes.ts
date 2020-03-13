import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

// любой HTTP-запрос от внешнего интерфейса этого приложения,
// postID которого не найден в базе данных, будет считаться недействительным.
@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) throw new BadRequestException('Invalid ID!');
        return value;
    }
}