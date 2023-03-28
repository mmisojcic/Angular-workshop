using AutoMapper;
using Budget.DBAccess.Interfaces;
using Budget.Models.DTO;
using Budget.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget.DBAccess.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        private readonly IUserHelperService _userService;

        public CategoryService(ICategoryRepository repository, IMapper mapper, IUserHelperService userService)
        {
            _repository = repository;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<Category> Add(Category categoryDTO)
        {
            var category = new Category();
            category.Color = categoryDTO.Color;
            category.Name = categoryDTO.Name;
            category.Type = categoryDTO.Type;
            category.User = await _userService.GetUser();
            await _repository.Add(category);
            await _repository.Save();
            return category;
        }

        public async Task<Category> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<List<Category>> GetAll()
        {
            return await _repository.GetAll(_userService.GetUserId());
        }

        public async Task Update(Category categoryDTO)
        {
             _repository.Update(categoryDTO);
            await _repository.Save();
        }

        public async Task<bool> Delete(List<int> ids)
        {
            if (!await _repository.CategoriesExists(ids))
                return false;

            _repository.Delete(ids);
            await _repository.Save();
            return true;
        }
    }
}
