//
//  UIFont+Extension.swift
//  ReadyB
//
//  Created by Pradip Sutariya on 23/12/21.
//  Copyright © 2021 Ordex. All rights reserved.
//

import UIKit

let SCREEN_MIN_SIZE = min(UIScreen.main.bounds.size.width, UIScreen.main.bounds.size.height)
let SCREEN_SIZE = UIScreen.main.bounds.size
let SCREEN_RATIO = CGFloat(SCREEN_MIN_SIZE)/320

public enum FontStyle:String {
    case none, italic
}

public enum FontWeight:String {
    case  thin, light, regular, medium, semibold, bold, heavy, black, extrabold, book
    
    public init(type:String) {
        self = FontWeight(rawValue: type)!
    }
}

extension UIFont {
    private static func fontWeight(weight:FontWeight) -> String {
        switch weight {
            
        case .thin:
            return "Thin"
            
        case .light:
            return "Light"
            
        case .regular:
            return "Regular"
            
        case .medium:
            return "Medium"
            
        case .semibold:
            return "SemiBold"
            
        case .heavy:
            return "Heavy"
            
        case .black:
            return "Black"
            
        case .bold:
            return "Bold"
            
        case .extrabold:
            return "ExtraBold"
            
        case .book:
            return "Book"
        }
    }
    
    private static func name(weight:FontWeight, style:FontStyle) -> String {
        let base = "Axiforma"
        let weightNumber = UIFont.fontWeight(weight: weight)
        let weightAndStyle:String
        switch style {
        case _ where style == .italic && (weight == .thin || weight == .semibold || weight == .light || weight == .heavy || weight == .extrabold || weight == .book || weight == .bold || weight == .book):
            weightAndStyle = "Italic"
        case .italic:
            weightAndStyle = "\(weightNumber)Italic"
        default:
            weightAndStyle = weightNumber
        }
        
        return "\(base)-\(weightAndStyle)"
    }
    
    
    
    static func appFont(size:CGFloat, weight:FontWeight, scaleFont : Bool) -> UIFont {
        
        var ratio : CGFloat = 1.0
        if scaleFont == true {
            ratio = SCREEN_RATIO
        }
        let fontName = UIFont.name(weight: weight, style:.none)
        return UIFont(name: fontName, size: CGFloat(size * ratio)) ?? UIFont.systemFont(ofSize: CGFloat(size * ratio), weight: .regular)
    }
    
    static func appFont(size:CGFloat, weight:FontWeight) -> UIFont {
        
        let fontName = UIFont.name(weight: weight, style:.none)
        return UIFont(name: fontName, size: CGFloat(size)) ?? UIFont.systemFont(ofSize: CGFloat(size), weight: .regular)
    }
    
    static func appItalicFont(size:CGFloat = 17, weight:FontWeight = .regular, style:FontStyle = .none, scaleFont : Bool = false) -> UIFont {
        
        var ratio : CGFloat = 1.0
        if scaleFont == true {
            ratio = SCREEN_RATIO
        }
        let fontName = UIFont.name(weight: weight, style:.none)
        return UIFont(name: fontName, size: CGFloat(size * ratio)) ?? UIFont.systemFont(ofSize: CGFloat(size * ratio), weight: .regular)
    }
    
    static func CTFont (size: CGFloat, weight:FontWeight = .regular) -> CTFont {
        let fontName = UIFont.name(weight: weight, style:.none)
        return CTFontCreateWithName(fontName as CFString, size, nil)
    }
}
