import { IJwtPayload } from "@common/interfaces";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext): IJwtPayload => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user as IJwtPayload;

        return data ? user[data] : user;
    }
)