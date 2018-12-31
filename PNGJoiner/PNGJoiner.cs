using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;


namespace Palindroms
{
    class Program
    {
        static void Main()
        {
			//string path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
			string path = Directory.GetCurrentDirectory();
			DirectoryInfo d = new DirectoryInfo(path);
			FileInfo[] Files = d.GetFiles("*.png");
			List<Image> imageList = new List<Image>();
			foreach(FileInfo file in Files )
			{
			  Console.WriteLine("{0}", file.Name);
			  imageList.Add(Image.FromFile(file.Name));
			}
			//Image image1 = Image.FromFile("SampImag.jpg");
			//Image image1 = Image.FromFile("SampImag.jpg");
			Bitmap bitmap = new Bitmap(58*imageList.Count, 64);//imageList.Sort();
			using (Graphics g = Graphics.FromImage(bitmap))
			{
				
			//	g.DrawImage(image1, 0, 0);
			//	g.DrawImage(image2, image1.Width, 0);
				for(int i=0;i<imageList.Count;i++)
				{
					g.DrawImage(imageList[i], i*58, 0);
				}
				bitmap.Save(path+"\\test.png", ImageFormat.Png);
			}
			
		}
	}
}