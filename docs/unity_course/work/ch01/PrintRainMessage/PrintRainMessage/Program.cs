namespace PrintRainMessage;

internal class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, world");
        Console.WriteLine("Chinese Democracy is done and it's November");
        Console.WriteLine("Is it raining?");

        string condition = ResolveCondition(args);
        Console.WriteLine("Weather condition: " + condition);
        Console.WriteLine(GetAdvice(condition));
    }

    static string ResolveCondition(string[] args)
    {
        if (args.Length != 0)
        {
            if (!string.IsNullOrWhiteSpace(args[0]))
            {
                return Normalize(args[0]);
            }
        }

        return "unknown";
    }

    static string Normalize(string value)
    {
        return value.Trim().ToLowerInvariant();
    }

    static string GetAdvice(string condition)
    {
        if (condition == "rain") return "Take an umbrella and wear waterproof shoes.";
        if (condition == "sunny") return "Use sunscreen and stay hydrated.";
        if (condition == "cloudy") return "Carry a light jacket just in case.";
        return "Weather unclear. Check a forecast app before leaving.";
    }
}