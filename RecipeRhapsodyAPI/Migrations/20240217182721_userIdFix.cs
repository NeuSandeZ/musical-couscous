using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeRhapsodyAPI.Migrations
{
    /// <inheritdoc />
    public partial class userIdFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_AspNetUsers_ApplicationUserId1",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_ApplicationUserId1",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "Recipes");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "Recipes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_ApplicationUserId",
                table: "Recipes",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_AspNetUsers_ApplicationUserId",
                table: "Recipes",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_AspNetUsers_ApplicationUserId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_ApplicationUserId",
                table: "Recipes");

            migrationBuilder.AlterColumn<Guid>(
                name: "ApplicationUserId",
                table: "Recipes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId1",
                table: "Recipes",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_ApplicationUserId1",
                table: "Recipes",
                column: "ApplicationUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_AspNetUsers_ApplicationUserId1",
                table: "Recipes",
                column: "ApplicationUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
