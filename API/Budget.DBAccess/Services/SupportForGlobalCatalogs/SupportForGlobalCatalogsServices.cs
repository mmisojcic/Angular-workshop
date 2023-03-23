using Budget.DBAccess.Interfaces.SupportForGlobalCatalogs;

namespace Budget.DBAccess.Services.SupportForGlobalCatalogs;

public class SupportForGlobalCatalogsServices<T> : ISupportForGlobalCatalogsServices<T> where T : class
{
    readonly ISupportForGlobalCatalogsRepository<T> _service;

    public SupportForGlobalCatalogsServices(ISupportForGlobalCatalogsRepository<T> service)
    {
        _service = service;
    }

    public async Task<List<T>> GetAll()
    {
        return await _service.GetAll();
    }

    public async Task<T> Get(int itemID)
    {
        return await _service.Get(itemID);
    }

    public async Task<List<T>> Add(List<T> items)
    {
        await _service.Add(items);
        await _service.Save();
        return items;
    }

    public async Task<List<T>> Update(List<T> items)
    {
        if (!await _service.ItemsExists(items))
            return null;

        _service.Update(items);
        await _service.Save();
        return items;
    }

    public async Task<List<T>> Delete(List<T> items)
    {
        if (!await _service.ItemsExists(items))
            return null;

        _service.Delete(items);
        await _service.Save();
        return items;
    }
}
