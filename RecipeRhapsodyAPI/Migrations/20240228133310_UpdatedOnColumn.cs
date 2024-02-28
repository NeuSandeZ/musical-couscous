﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeRhapsodyAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedOnColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "Recipes",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Recipes");
        }
    }
}
