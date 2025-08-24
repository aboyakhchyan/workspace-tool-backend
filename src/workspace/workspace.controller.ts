import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceNameDto } from './dto/workspace-name.dto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApiCommonException, Auth } from '@common/decorators/metod';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { User } from '@common/decorators/param/user.decorator';

@Auth()
@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('search/slug')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ type: WorkspaceNameDto })
  @ApiCommonException()
  async searchValidSlug(@Query() data: WorkspaceNameDto) {
    const { name } = data;
    return this.workspaceService.searchValidSlug(name);
  }

  @Post('create/slug')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateWorkspaceDto })
  @ApiCommonException()
  async createWorkspace(
    @Body() workspace: CreateWorkspaceDto,
    @User('id', ParseIntPipe) id: number,
  ) {
    return this.workspaceService.createWorkspace(workspace, id);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiCommonException()
  async findWorkspaces(
    @User('id', ParseIntPipe) id: number,
    @User('id', ParseIntPipe) userId: number,
  ) {
    return this.workspaceService.findWorkspaces(id, userId);
  }

  @Get(':slug')
  @HttpCode(HttpStatus.OK)
  @ApiCommonException()
  async findWorkspace(@Param('slug') slug: string) {
      return this.workspaceService.findWorkspace(slug);
  }


  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiCommonException()
  async deleteWorkspace(
    @Param('id', ParseIntPipe) id: number,
    @User('id', ParseIntPipe) userId: number,
  ) {
    return this.workspaceService.deleteWorkspace(id);
  }
}
