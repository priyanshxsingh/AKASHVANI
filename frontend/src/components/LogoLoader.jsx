import { motion } from "framer-motion";

function LogoLoader({ onComplete }) {
  
  return (
    <motion.div
      className="
        fixed inset-0
        z-[9999]
        flex items-center justify-center
        overflow-hidden
        bg-[#fdfcf9]
      "
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: 4.8,
        duration: 0.8,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      {/* MAIN CONTAINER */}
      <motion.div
        className="
          relative
          w-[min(850px,92vw)]
          aspect-[850/520]
        "
        initial={{ scale: 1 }}
        animate={{ scale: 0.96 }}
        transition={{
          delay: 4.5,
          duration: 0.7,
          ease: "easeInOut",
        }}
      >
        {/* LEFT CLOUD */}
        <motion.img
          src="/loginLoaderImg/cloud.png"
          alt=""
          className="
            absolute
            left-[2%]
            top-[25%]
            z-10
            w-[29.5%]
          "
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* SECOND LEFT CLOUD */}
        <motion.img
          src="/loginLoaderImg/cloud.png"
          alt=""
          className="
            absolute
            left-[12%]
            top-[39%]
            z-20
            w-[25.8%]
          "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* SUN + CLOUD */}
        <motion.img
          src="/loginLoaderImg/suncloud.png"
          alt=""
          className="
            absolute
            right-[3%]
            top-[15%]
            z-10
            w-[24.7%]
          "
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.35,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* CLOUD OVER SUN */}
        <motion.img
          src="/loginLoaderImg/cloud.png"
          alt=""
          className="
            absolute
            right-[5%]
            top-[40%]
            z-20
            w-[29.2%]
          "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.65,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* BIRDS RIGHT */}
        <motion.img
          src="/loginLoaderImg/birds.png"
          alt=""
          className="
            absolute
            right-[13%]
            top-[4%]
            z-50
            w-[15.9%]
          "
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeOut",
          }}
        />

        {/* BIRDS LEFT */}
        <motion.img
          src="/loginLoaderImg/birds.png"
          alt=""
          className="
            absolute
            left-[28%]
            top-[12%]
            z-50
            w-[9.4%]
          "
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.7,
            ease: "easeOut",
          }}
        />

        {/* TOWER */}
        <motion.img
          src="/loginLoaderImg/tower.png"
          alt=""
          className="
            absolute
            left-1/2
            top-[7%]
            z-30
            w-[13.5%]
            -translate-x-1/2
          "
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.9,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* SIGNAL WAVES */}
        <div
          className="
            absolute
            left-1/2
            top-[3%]
            z-40
            w-[18%]
            aspect-square
            -translate-x-1/2
            pointer-events-none
          "
        >
          {/* DOT */}
          <motion.div
            className="
              absolute
              left-1/2
              top-[65%]
              h-[6px]
              w-[6px]
              -translate-x-1/2
              rounded-full
              bg-[#182d4a]
            "
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 1.15,
              duration: 0.4,
            }}
          />

          {/* WAVE 1 */}
          <motion.div
            className="
              absolute
              left-1/2
              top-[52%]
              h-[28%]
              w-[28%]
              -translate-x-1/2
              rounded-full
              border-[2px]
              border-[#182d4a]
            "
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.2, 1, 1.25],
            }}
            transition={{
              delay: 1.2,
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* WAVE 2 */}
          <motion.div
            className="
              absolute
              left-1/2
              top-[37%]
              h-[55%]
              w-[55%]
              -translate-x-1/2
              rounded-full
              border-[2px]
              border-[#182d4a]
            "
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.2, 1, 1.2],
            }}
            transition={{
              delay: 1.45,
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* WAVE 3 */}
          <motion.div
            className="
              absolute
              left-1/2
              top-[22%]
              h-[82%]
              w-[82%]
              -translate-x-1/2
              rounded-full
              border-[2px]
              border-[#182d4a]
            "
            initial={{
              opacity: 0,
              scale: 0.2,
            }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.2, 1, 1.15],
            }}
            transition={{
              delay: 1.7,
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </div>

        {/* BIG ARC */}
        <svg
          className="
            absolute
            left-1/2
            top-[-5%]
            z-40
            w-[70%]
            -translate-x-1/2
            overflow-visible
          "
          viewBox="0 0 200 100"
        >
          <motion.path
            d="M 10 90 A 90 90 0 0 1 190 90"
            fill="none"
            stroke="#182d4a"
            strokeWidth="1"
            strokeLinecap="round"
            pathLength="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* GOLD DETAIL */}
        <motion.div
          className="
            absolute
            left-1/2
            top-[40%]
            z-40
            h-[6px]
            w-[6px]
            -translate-x-1/2
            rounded-full
            bg-[#b08d57]
          "
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 2.2,
            duration: 0.5,
          }}
        />

        {/* AKASHVANI WORDMARK */}
        <div
          className="
            absolute
            left-1/2
            top-[52%]
            z-50
            w-[89.5%]
            -translate-x-1/2
            overflow-hidden
          "
        >
          <motion.img
            src="/loginLoaderImg/akashvani.png"
            alt="आकाशVANI"
            className="w-full"
            initial={{ x: "-105%" }}
            animate={{ x: "0%" }}
            transition={{
              delay: 2.2,
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        {/* TAGLINE */}
        <motion.img
          src="/loginLoaderImg/thevoiceofthesky.png"
          alt="The Voice of the Sky"
          className="
            absolute
            bottom-[-35%]
            left-[51%]
            z-50
            w-[75%]
            -translate-x-1/2
          "
          initial={{
            clipPath: "inset(0 100% 0 0)",
          }}
          animate={{
            clipPath: "inset(0 0% 0 0)",
          }}
          transition={{
            delay: 1.2,
            duration: 2,
            ease: "easeInOut",
          }}
        />

        {/* UNDERLINE */}
        <motion.img
          src="/loginLoaderImg/underline.png"
          alt=""
          className="
            absolute
            bottom-[-75%]
            left-1/2
            z-40
            w-[75%]
            -translate-x-1/2
          "
          initial={{
            clipPath: "inset(0 100% 0 0)",
          }}
          animate={{
            clipPath: "inset(0 0% 0 0)",
          }}
          transition={{
            delay: 2.2,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default LogoLoader;