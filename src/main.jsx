import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowRight, Check, ChevronRight, Clock3, Instagram,
  MapPin, Minus, Phone, Plus, ShoppingBag, Sparkles, Star, Trash2,
  UtensilsCrossed, X, MessageCircle, Mail
} from "lucide-react";
import "./styles.css";

const RESTAURANT = {
  name: "Deepa Hunger's Point",
  tagline: "Ghar Jaisa",
  phone: "+919557597565",
  whatsapp: "919557597565",
  email: "deepapg268@gmail.com",
  address: "Dehradun, Uttarakhand",
  hours: "12:00 PM – 10:00 PM"
};

const menu = [
  { id:"aloo-parantha", name:"Aloo Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:40}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", trending:true, addons:[] },
  { id:"aloo-pyaaz-parantha", name:"Aloo Pyaaz Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:50}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"mix-veg-parantha", name:"Mix veg Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:50}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"methi-parantha", name:"Methi Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:50}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"laccha-pyaaz-parantha", name:"Laccha Pyaaz Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:60}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"paneer-parantha", name:"Paneer Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:80}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"paneer-pyaaz-parantha", name:"Paneer Pyaaz Parantha", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:90}], image:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"veg-omelete", name:"Veg Omelete", category:"Parantha's", variants:[{id:"regular",label:"1 pc",price:80}], image:"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"pizza-parantha", name:"Pizza Parantha", category:"Parantha's", variants:[{id:"half",label:"Half",price:90},{id:"full",label:"Full",price:160}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"aloo-sandwich", name:"Aloo Sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:35},{id:"4pc",label:"4 pc",price:60}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"mayo-sandwich", name:"Mayo Sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:40},{id:"4pc",label:"4 pc",price:70}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"grill-sandwich", name:"Grill sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:50},{id:"4pc",label:"4 pc",price:80}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"sweet-corn-sandwich", name:"Sweet Corn Sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:50},{id:"4pc",label:"4 pc",price:75}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"cheese-sweet-corn-sandwich", name:"Cheese Sweet Corn Sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:65},{id:"4pc",label:"4 pc",price:90}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"veg-sandwich", name:"Veg sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:40},{id:"4pc",label:"4 pc",price:70}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"paneer-sandwich", name:"Paneer Sandwich", category:"Sandwiches", variants:[{id:"2pc",label:"2 pc",price:60},{id:"4pc",label:"4 pc",price:100}], image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"salted-sweet-corn", name:"Salted", category:"Sweet Corn", variants:[{id:"small",label:"Small",price:40},{id:"large",label:"Large",price:60}], image:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"schezwan-sweet-corn", name:"Schezwan", category:"Sweet Corn", variants:[{id:"small",label:"Small",price:60},{id:"large",label:"Large",price:80}], image:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"masala-sweet-corn", name:"Masala", category:"Sweet Corn", variants:[{id:"small",label:"Small",price:50},{id:"large",label:"Large",price:70}], image:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"tea", name:"Tea", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:20}], image:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"masala-tea", name:"Masala Tea", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:30}], image:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"coffee", name:"Coffee", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:40}], image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"green-tea", name:"Green Tea", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:40}], image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"lemon-tea", name:"Lemon tea", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:35}], image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"black-coffee", name:"Black Coffee", category:"Hot Beverages", variants:[{id:"regular",label:"Regular",price:30}], image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"litchi-squash", name:"Litchi squash", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:60}], image:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"lemon-mojito", name:"Lemon Mojito", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"aam-panna", name:"Aam Panna", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:50}], image:"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"cola-blast", name:"Cola Blast", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"lassi", name:"Lassi", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"cold-coffee", name:"Cold Coffee", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:100}], image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}] },
  { id:"banana-shake", name:"Banana Shake", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"oreo-shake", name:"Oreo Shake", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"roohafza", name:"Roohafza", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:70}], image:"https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"vanilla-shake", name:"Vanilla Shake", category:"Cold Beverages", variants:[{id:"regular",label:"Regular",price:70}], image:"https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"plain-pancake", name:"Plain Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:90}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },
  { id:"chocochip-pancake", name:"Chocochip Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:110}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },
  { id:"chocolate-chocochip-pancake", name:"Chocolate Chocochip Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:120}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },
  { id:"chocolate-pancake", name:"Chocolate Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:100}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },
  { id:"banana-pancake", name:"Banana Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:110}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },
  { id:"banana-chocochip-pancake", name:"Banana Chocochip Pancake", category:"Pancakes", variants:[{id:"regular",label:"Regular",price:125}], image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", addons:[{id:"icecream",name:"Ice cream scoop",price:25}], note:"Served with honey" },

  { id:"aata-pani-puri", name:"Aata Pani Puri", category:"Chaat", variants:[{id:"6pc",label:"6 pc",price:40}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"sooji-pani-puri", name:"Sooji Pani Puri", category:"Chaat", variants:[{id:"5pc",label:"5 pc",price:40}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"dahi-gol-gappe", name:"Dahi Gol Gappe [Sooji]", category:"Chaat", variants:[{id:"5pc",label:"5 pc",price:50}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"aloo-tikki", name:"Aloo Tikki", category:"Chaat", variants:[{id:"1pc",label:"1 pc",price:50},{id:"2pc",label:"2 pc",price:80}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"papdi-chaat", name:"Papdi Chaat", category:"Chaat", variants:[{id:"regular",label:"Regular",price:80}], image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", addons:[] },

  { id:"plain-maggi", name:"Plain Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:30}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"schezwan-maggi", name:"Schezwan Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:40}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"cheese-shezwan-maggi", name:"Cheese Shezwan Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:55}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"veg-maggi", name:"Veg Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:40}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"veg-chesse-maggi", name:"Veg Chesse Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:55}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"sweet-corn-maggi", name:"Sweet Corn Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:45}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] },
  { id:"cocktail-maggi", name:"Cocktail Maggi", category:"Maggi", variants:[{id:"regular",label:"Regular",price:100}], image:"https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80", addons:[] }
];

const categories = ["All", ...new Set(menu.map(x => x.category))];

function money(n){ return `₹${n}`; }

function getOrderCharges(cart, orderType) {
  const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);

  if (orderType === "Takeaway") {
    return {
      packing: totalQuantity <= 2 ? 5 : 10,
      delivery: 0
    };
  }

  if (orderType === "Delivery") {
    return {
      packing: 0,
      delivery: 30
    };
  }

  return {
    packing: 0,
    delivery: 0
  };
}

function App(){
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("dhp-cart-v2") || "[]"));
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => localStorage.setItem("dhp-cart-v2", JSON.stringify(cart)), [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => category === "All" ? menu : menu.filter(i => i.category === category), [category]);
  const totalItems = cart.reduce((a,i)=>a+i.qty,0);
  const total = cart.reduce((a,i)=>a+i.qty*(i.price+i.addons.reduce((s,x)=>s+x.price,0)),0);

  const addToCart = (item, addons=[], variant=item.variants[0]) => {
    const key = item.id + "|" + variant.id + "|" + addons.map(a=>a.id).sort().join(",");
    setCart(prev => {
      const found = prev.find(x=>x.key===key);
      if(found) return prev.map(x=>x.key===key ? {...x, qty:x.qty+1} : x);
      return [...prev, {key, id:item.id, name:item.name, price:variant.price, variant:variant.label, qty:1, addons}];
    });
    setSelected(null);
    setToast(`${item.name} added to cart`);
    setTimeout(()=>setToast(""), 1800);
  };

  const changeQty = (key, delta) => setCart(prev => prev.flatMap(x => x.key===key ? [{...x, qty:x.qty+delta}].filter(y=>y.qty>0) : [x]));
  const removeItem = key => setCart(prev=>prev.filter(x=>x.key!==key));

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div className="app">
      <header className="nav">
        <button className="brand" onClick={()=>scrollTo("home")}>
          <span className="brand-mark"><UtensilsCrossed size={17}/></span>
          <span>Deepa Hunger's Point</span>
        </button>
        <nav>
          <button onClick={()=>scrollTo("menu")}>Menu</button>
          <button onClick={()=>scrollTo("about")}>About</button>
          <button onClick={()=>scrollTo("contact")}>Contact</button>
        </nav>
        <button className="cart-pill" onClick={()=>setCartOpen(true)} aria-label="Open cart">
          <ShoppingBag size={17}/>
          {totalItems > 0 && <span>{totalItems}</span>}
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>VEGETARIAN • HOMESTYLE • FRESH</motion.p>
            <motion.h2 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.1}}>
              Food that feels<br/><em>like home.</em>
            </motion.h2>
            <motion.p className="hero-text" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.2}}>
              From warm aloo parathas to fluffy pancakes and comforting ghar ka khana — made for good meals and better moments.
            </motion.p>
            <motion.div className="hero-actions" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}>
              <button className="primary" onClick={()=>scrollTo("menu")}>Explore Menu <ArrowDown size={17}/></button>
              <a className="secondary" href={`tel:${RESTAURANT.phone}`}><Phone size={16}/> Call us</a>
            </motion.div>
            <div className="hero-meta"><span><Sparkles size={15}/> Made with care</span><span><Clock3 size={15}/> Open today</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="Homestyle vegetarian food"/>
              <div className="image-overlay"/>
              <div className="hero-badge"><Star size={15} fill="currentColor"/> Ghar Jaisa</div>
            </div>
            <div className="floating-note"><span>Today's mood</span><strong>Something delicious.</strong></div>
          </div>
        </section>

        <section className="story-strip" id="about">
          <div><span className="eyebrow">OUR PROMISE</span><h3>Simple food.<br/>Real comfort.</h3></div>
          <p>Deepa Hunger's Point is built around the feeling of a meal made at home — warm, familiar, vegetarian food without the fuss.</p>
        </section>

        <section id="menu" className="menu-section">
          <div className="section-head">
            <div><span className="eyebrow">WHAT'S COOKING</span><h3>Pick your comfort.</h3></div>
            <p>Browse the menu, make it yours, and add your favourites to the cart.</p>
          </div>

          <div className="categories">
            {categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}
          </div>

          <div className="menu-grid">
            {filtered.map((item,i)=>(
              <motion.article className="food-card" key={item.id} layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:i*.04}}>
                <div className="food-image">
                  <img src={item.image} alt={item.name}/>
                  {item.trending && <span className="trend"><Sparkles size={12}/> Trending</span>}
                </div>
                <div className="food-info">
                  <div className="food-top"><h4>{item.name}</h4><strong>{item.variants.length > 1 ? `${money(item.variants[0].price)}+` : money(item.variants[0].price)}</strong></div>
                  <p>{item.note || (item.variants.length > 1 ? item.variants.map(v=>`${v.label}: ${money(v.price)}`).join(" · ") : item.variants[0].label !== "Regular" && item.variants[0].label !== "1 pc" ? item.variants[0].label : "")}</p>
                  <div className="food-bottom">
                    <button className="details" onClick={()=>setSelected(item)}>Details <ChevronRight size={15}/></button>
                    <button className="add" onClick={()=>setSelected(item)}>+ Add</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="order-banner">
          <div><span className="eyebrow">READY WHEN YOU ARE</span><h3>Found your favourites?</h3><p>Add them to your cart and send the order straight to us on WhatsApp.</p></div>
          <button className="primary" onClick={()=>setCartOpen(true)}>View Cart <ShoppingBag size={17}/></button>
        </section>

        <section id="contact" className="contact">
          <div className="section-head"><div><span className="eyebrow">COME SAY HI</span><h3>Find us here.</h3></div></div>
          <div className="contact-grid">
            <a href={`tel:${RESTAURANT.phone}`}><Phone/><span><small>Call</small><strong>{RESTAURANT.phone}</strong></span></a>
            <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank"><MessageCircle/><span><small>WhatsApp</small><strong>Chat with us</strong></span></a>
            <a href="https://maps.google.com/?q=Dehradun" target="_blank"><MapPin/><span><small>Location</small><strong>{RESTAURANT.address}</strong></span></a>
            <a href={RESTAURANT.instagram} target="_blank"><Instagram/><span><small>Instagram</small><strong>Follow us</strong></span></a>
            <div><Clock3/><span><small>Opening Hours</small><strong>{RESTAURANT.hours}</strong></span></div>
            <a href={`mailto:${RESTAURANT.email}`}><Mail/><span><small>Email</small><strong>{RESTAURANT.email}</strong></span></a>
          </div>
          <div className="reviews"><span className="eyebrow">WHAT PEOPLE SAY</span><div className="review-row"><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/><Star size={18} fill="currentColor"/></div><p>“A warm place, familiar flavours, and food that feels like it was made just for you.”</p><small>— Customer review placeholder</small></div>
        </section>
      </main>

      <footer><div><strong>Deepa Hunger's Point</strong><span>Ghar Jaisa</span></div><p>Vegetarian food made with care.</p></footer>

      <AnimatePresence>
        {totalItems>0 && !cartOpen && <motion.button className="floating-cart" initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} onClick={()=>setCartOpen(true)}><ShoppingBag size={18}/><span>{totalItems} item{totalItems>1?"s":""}</span><b>{money(total)}</b></motion.button>}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <motion.div className="toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}><Check size={17}/>{toast}</motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {selected && <ItemModal item={selected} onClose={()=>setSelected(null)} onAdd={addToCart}/>}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && <CartModal cart={cart} total={total} onClose={()=>setCartOpen(false)} onChange={changeQty} onRemove={removeItem} onOrder={()=>{setCartOpen(false);setOrderOpen(true)}}/>}
      </AnimatePresence>

      <AnimatePresence>
        {orderOpen && (
          <OrderModal
            cart={cart}
            total={total}
            onClose={()=>setOrderOpen(false)}
            onOrderComplete={()=>{
              localStorage.removeItem("dhp-cart-v2");
              setCart([]);
              setOrderOpen(false);
              setCartOpen(false);
            }}
          />
)}
      </AnimatePresence>
    </div>
  );
}

function ItemModal({item,onClose,onAdd}){
  const [addons,setAddons]=useState([]);
  const [variantId,setVariantId]=useState(item.variants[0].id);
  const variant=item.variants.find(v=>v.id===variantId) || item.variants[0];
  const toggle=a=>setAddons(x=>x.some(y=>y.id===a.id)?x.filter(y=>y.id!==a.id):[...x,a]);
  const total=variant.price+addons.reduce((s,x)=>s+x.price,0);
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <motion.div className="modal item-modal" initial={{y:30,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}}>
      <button className="close" onClick={onClose}><X/></button>
      <img src={item.image} alt={item.name}/>
      <div className="modal-body"><span className="eyebrow">{item.category}</span><h3>{item.name}</h3>
        {item.note && <p className="muted">{item.note}</p>}
        {item.variants.length>1 && <div className="addons"><h4>Choose an option</h4>{item.variants.map(v=><button key={v.id} className={variantId===v.id?"addon selected":"addon"} onClick={()=>setVariantId(v.id)}><span>{v.label}</span><strong>{money(v.price)}</strong>{variantId===v.id&&<Check size={16}/>}</button>)}</div>}
        {item.addons.length>0 && <div className="addons"><h4>Add-ons</h4>{item.addons.map(a=><button key={a.id} className={addons.some(x=>x.id===a.id)?"addon selected":"addon"} onClick={()=>toggle(a)}><span>{a.name}</span><strong>+{money(a.price)}</strong>{addons.some(x=>x.id===a.id)&&<Check size={16}/>}</button>)}</div>}
        <button className="primary full" onClick={()=>onAdd(item,addons,variant)}>Add to Cart · {money(total)}</button>
      </div>
    </motion.div>
  </div>
}

function CartModal({cart,total,onClose,onChange,onRemove,onOrder}){
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <motion.div className="modal cart-modal" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}>
      <div className="cart-head"><div><span className="eyebrow">YOUR ORDER</span><h3>Your cart</h3></div><button className="close" onClick={onClose}><X/></button></div>
      {cart.length===0 ? <div className="empty"><ShoppingBag size={38}/><h4>Your cart is empty</h4><p>Add something delicious from the menu.</p></div> :
      <><div className="cart-list">{cart.map(x=><div className="cart-row" key={x.key}><div><h4>{x.name}</h4>{x.variant&&<small>{x.variant}</small>}{x.addons.length>0&&<small>{x.addons.map(a=>a.name).join(", ")}</small>}<strong>{money((x.price+x.addons.reduce((s,a)=>s+a.price,0))*x.qty)}</strong></div><div className="qty"><button onClick={()=>onChange(x.key,-1)}><Minus/></button><b>{x.qty}</b><button onClick={()=>onChange(x.key,1)}><Plus/></button><button className="delete" onClick={()=>onRemove(x.key)}><Trash2/></button></div></div>)}</div>
      <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="primary full" onClick={onOrder}>Place Order <MessageCircle size={17}/></button><p className="fine">Your order request will be prepared for WhatsApp. Final availability and payment are confirmed by the restaurant.</p></>}
    </motion.div>
  </div>
}

function OrderModal({cart,total,onClose,onOrderComplete}){
  const [type,setType] = useState("Dine-in");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");

  const { packing, delivery } = getOrderCharges(cart, type);
  const finalTotal = total + packing + delivery;

  const valid = name.trim().length > 1 && phone.trim().length >= 10 && (type !== "Delivery" || address.trim().length > 4);

  const send = () => {
      if(!valid) return;

  const lines = cart
    .map(x =>
      `• ${x.qty} × ${x.name}${
          x.variant && x.variant !== "Regular"
            ? ` — ${x.variant}`
            : ""
        }${
          x.addons.length
            ? ` (${x.addons.map(a => a.name).join(", ")})`
            : ""
        }`
      )
      .join("\n");

    const msg =
`Hello Deepa Hunger's Point 👋

I'd like to place an order request.

Order type: ${type}

${lines}

Subtotal: ₹${total}${
  packing > 0
    ? `\nTakeaway packing: ₹${packing}`
    : ""
}${
  delivery > 0
    ? `\nDelivery charge: ₹${delivery}`
    : ""
}

Total: ₹${finalTotal}

Customer: ${name}
Phone: ${phone}${
  type === "Delivery"
    ? `\nAddress: ${address}`
    : ""
}

PAYMENT:
I will make the online payment of ₹${finalTotal} before preparation
and share the payment screenshot on this WhatsApp number.

Please confirm the order after payment verification.`;

    window.open(
      `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    onOrderComplete();
  };

  return (
    <div className="modal-backdrop">
      <motion.div
        className="modal order-modal"
        initial={{y:30,opacity:0}}
        animate={{y:0,opacity:1}}
        exit={{y:30,opacity:0}}
      >
        <button className="close" onClick={onClose}>
          <X/>
        </button>

        <span className="eyebrow">ALMOST THERE</span>

        <h3>Send your order</h3>

        <p className="muted">
          We'll send the details to the restaurant on WhatsApp.
        </p>

        <label>
          Order type

          <div className="segmented">
            {["Dine-in","Takeaway","Delivery"].map(x => (
              <button
                key={x}
                className={type===x ? "active" : ""}
                onClick={() => setType(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </label>

        <label>
          Your name *
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Phone *
          <input
            type="tel"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </label> 

        {type==="Delivery" && (
          <label>
            Delivery address
            <textarea
              value={address}
              onChange={e=>setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </label>
        )}

        <div className="order-summary">

          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          {packing > 0 && (
            <div className="bill-row">
              <span>Takeaway packing</span>
              <span>₹{packing}</span>
            </div>
          )}

          {delivery > 0 && (
            <div className="bill-row">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>
          )}

          <div className="bill-row bill-total">
            <span>Total</span>
            <strong>₹{finalTotal}</strong>
          </div>

        </div>

        <button
          className="primary full"
          disabled={!valid}
          onClick={send}
        >
          Continue to WhatsApp
          <ArrowRight size={17}/>
        </button>

        <p className="fine">
          This creates an order request. The restaurant will confirm
          availability, final charges and payment.
        </p>

      </motion.div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
