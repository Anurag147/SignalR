var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Logging.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Trace);
builder.Logging.AddFilter("Microsoft.AspNetCore.Http.Connections", LogLevel.Trace);
var app = builder.Build();

//app.MapGet("/", () => "Hello World!");
app.UseRouting();
app.UseDefaultFiles(); //index.html
app.UseStaticFiles();

#pragma warning disable ASP0014 // Suggest using top level route registrations
app.UseEndpoints(configure => configure.MapHub<ViewHub>("/hub/view"));
#pragma warning restore ASP0014 // Suggest using top level route registrations

app.Run();
