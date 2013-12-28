package mygame.imgs;

import java.net.URL;

public class ImageLoader {

	public static final String CARDS = "cards";
	public static final String ACTORS = "actors";
	public static final String MENU = "menu";

	public static URL path(String path, String type) {
		if (type == null){
			return ImageLoader.class.getResource(path);
		}
		else{
			return ImageLoader.class.getResource(type +"/"+path);
		}
	}
	
	public static URL path(String path) {
		return path(path, null);
	}
		
}
